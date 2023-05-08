import datetime
import os, sys
import json
from google.cloud import datastore, storage
from flask import Flask, jsonify, make_response, request, Response
import random

sys.path.insert(0, os.getcwd()+"/GCP_func")
sys.path.append(os.path.abspath("/adopt-a-pal/api"))
# from GCP_func import upload_pic, bucket_metadata

app = Flask(__name__, static_folder='./build', static_url_path='/')
client = datastore.Client()


ANIMALS = "animals"

MISSING_DISPOSITIONS = {
    "ERROR": "ANIMAL REQUIRES ATLEAST ONE DISPOSITION."
}

REQUIRED_ANIMAL_ATTRIBUTES = ["name", "species", "breed", "availability", "pic_name"]

MISSING_ATTRIBUTES = {
    "ERROR": "ANIMAL MISSING REQUIRED ATTRIBUTES (NAME, SPECIES, BREED, AVAILABILITY, pic_name)."
}

ANIMAL_NOT_FOUND = {
    "ERROR": "ANIMAL NOT FOUND."
}

INVALID_INPUT = {
    "ERROR" : "INVALID INPUT."
}

PIC_ATTRIBUTES = ["pic1", "pic2", "pic3"]

PLACEHOLDER_IMAGE = "https://storage.cloud.google.com/adopt-a-pal-pics/placeholder.jpg"

REQUIRED_DISPOSITIONS = ["disposition_animals", "disposition_children", "disposition_leash"]

@app.route('/')
def root():
    return app.send_static_file('index.html')

# @app.route("/api/endpoint", methods=["GET"])
# def endpoint():
#     resp = make_response({"cat": 15})
#     resp.headers["Access-Control-Allow-Origin"] = "*"
#     return resp

@app.route('/api/hello')
def hello():
    print(bucket_metadata("adopt-a-pal-pics"))
    return jsonify(message='Hello World!')

@app.route('/api/animals', methods=["GET", "POST"])
def animals():
    if request.method == "GET":
        query = client.query(kind=ANIMALS)

        species = request.args.get("species")
        breed = request.args.get("breed")
        disposition_animals = request.args.get("disposition_animals")
        disposition_children = request.args.get("disposition_children")
        disposition_leash = request.args.get("disposition_leash")

        if species:
            query.add_filter("species", "=", species)

        if breed:
            query.add_filter("breed", "=", breed)

        if disposition_animals:
            if disposition_animals.lower() == "true":
                query.add_filter("dispositions", "=", "Good with other animals")

        if disposition_children:
            if disposition_children.lower() == "true":
                query.add_filter("dispositions", "=", "Good with children")

        if disposition_leash:
                if disposition_leash.lower() == "true":
                    query.add_filter("dispositions", "=", "Animal must be leashed at all times")

        results = list(query.fetch())

        for e in results:
            e["id"] = e.key.id
        return Response(json.dumps(results, default=str), status=200,
                        mimetype='application/json')
        
    elif request.method == "POST":
        content = request.get_json()

        entity = datastore.Entity(key=client.key(ANIMALS))

        for key in REQUIRED_ANIMAL_ATTRIBUTES:
            if key not in content:
                return Response(json.dumps(MISSING_ATTRIBUTES), status=400,
                        mimetype='application/json')

        animal = {
            "name": content["name"],
            "species": content["species"],
            "breed": content["breed"],
            "availability": content["availability"],
            "added": datetime.datetime.now(),
            "avatars":[]
        }

        for d in REQUIRED_DISPOSITIONS:
            if d not in content:
                return Response(json.dumps(MISSING_DISPOSITIONS), status=400, mimetype='application/json')

        if (content["disposition_animals"] is not True) and (content["disposition_children"] is not True) and (content["disposition_leash"] is not True):
            return Response(json.dumps(MISSING_DISPOSITIONS), status=400,
                mimetype='application/json')

        dispositions = []

        if content["disposition_animals"] is True:
            dispositions.append("Good with other animals")

        if content["disposition_children"] is True:
            dispositions.append("Good with children")

        if content["disposition_leash"] is True:
            dispositions.append("Animal must be leashed at all times")

        animal.update({
            "dispositions": dispositions
        })

        #check for pic 1-3, if missing use placeholder.jpg, else upload photo
        random.seed()
        for pic in PIC_ATTRIBUTES:
            if pic not in content:
                animal['avatars'].append(PLACEHOLDER_IMAGE)
            else:
                prefix = random.randrange(9999999)
                pic_url = upload_pic(content[pic], content["pic_name"] + str(prefix))
                animal['avatars'].append(pic_url)

        entity.update(animal)
        client.put(entity)
        eid = entity.key.id
        new_animal_key = client.key(ANIMALS, int(eid))
        res = client.get(key=new_animal_key)
        res["id"] = int(eid)

        return Response(json.dumps(res, default=str), status=201,
                        mimetype='application/json')
    else:
        return jsonify(message='405')

@app.route("/api/animals/<eid>", methods=["GET", "PUT", "DELETE"])
def animal_get_patch_delete(eid):

    try:
        int(eid)
    except ValueError:
        return Response(json.dumps(INVALID_INPUT), status=403,
                    mimetype='application/json')    

    if request.method == "GET":
        animal_key = client.key(ANIMALS, int(eid))
        res = client.get(animal_key)

        if not res:
            return Response(json.dumps(ANIMAL_NOT_FOUND), status=404,
                        mimetype='application/json')

        res["id"] = int(eid)

        return Response(json.dumps(res, default=str), status=200,
                        mimetype='application/json')


    elif request.method == "PUT":
        content = request.get_json()

        for key in REQUIRED_ANIMAL_ATTRIBUTES:
            if key not in content:
                return Response(json.dumps(MISSING_ATTRIBUTES), status=400,
                        mimetype='application/json')

        animal_key = client.key(ANIMALS, int(eid))
        res = client.get(animal_key)

        if not res:
            return Response(json.dumps(ANIMAL_NOT_FOUND), status=404,
                        mimetype='application/json')


        for key in REQUIRED_ANIMAL_ATTRIBUTES:
            res[key] = content[key]

        dispositions = []

        for d in REQUIRED_DISPOSITIONS:
            if d not in content:
                return Response(json.dumps(MISSING_DISPOSITIONS), status=400, mimetype='application/json')

        if (content["disposition_animals"] is not True) and (content["disposition_children"] is not True) and (content["disposition_leash"] is not True):
            return Response(json.dumps(MISSING_DISPOSITIONS), status=400,
                mimetype='application/json')

        if content["disposition_animals"] is True:
            dispositions.append("Good with other animals")

        if content["disposition_children"] is True:
            dispositions.append("Good with children")

        if content["disposition_leash"] is True:
            dispositions.append("Animal must be leashed at all times")

        res["dispositions"] = dispositions

        #if pic not in edit request, use same photo, else upload new photo
        new_pics = [] 
        random.seed()
        for index, pic in enumerate(PIC_ATTRIBUTES):
            if pic not in content:
                new_pics.append(res["avatars"][index])
            else:
                prefix = random.randrange(9999999)
                pic_url = upload_pic(content[pic], content["pic_name"] + str(prefix))
                new_pics.append(pic_url)

        res["avatars"] = new_pics

        client.put(res)

        res["id"] = int(eid)

        return Response(json.dumps(res, default=str), status=200,
                        mimetype='application/json')

    elif request.method == "DELETE":
        animal_key = client.key(ANIMALS, int(eid))
        res = client.get(animal_key)

        if not res:
            return Response(json.dumps(ANIMAL_NOT_FOUND), status=404,
                        mimetype='application/json')

        client.delete(animal_key)

        return Response(status=204)

    else:
        return Response(json.dumps("ERROR_405"), status=405,
                        mimetype='application/json')

def bucket_metadata(bucket_name):
    """Prints out a bucket's metadata."""
    # bucket_name = 'your-bucket-name'

    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)

    print(f"ID: {bucket.id}")
    print(f"Name: {bucket.name}")
    print(f"Storage Class: {bucket.storage_class}")
    print(f"Location: {bucket.location}")
    print(f"Location Type: {bucket.location_type}")
    print(f"Cors: {bucket.cors}")
    print(f"Default Event Based Hold: {bucket.default_event_based_hold}")
    print(f"Default KMS Key Name: {bucket.default_kms_key_name}")
    print(f"Metageneration: {bucket.metageneration}")
    print(
        f"Public Access Prevention: {bucket.iam_configuration.public_access_prevention}"
    )
    print(f"Retention Effective Time: {bucket.retention_policy_effective_time}")
    print(f"Retention Period: {bucket.retention_period}")
    print(f"Retention Policy Locked: {bucket.retention_policy_locked}")
    print(f"Requester Pays: {bucket.requester_pays}")
    print(f"Self Link: {bucket.self_link}")
    print(f"Time Created: {bucket.time_created}")
    print(f"Versioning Enabled: {bucket.versioning_enabled}")
    print(f"Labels: {bucket.labels}")

def upload_pic(source_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
    # The ID of your GCS bucket
    # bucket_name = "your-bucket-name"
    # The path to your file to upload
    # source_file_name = "local/path/to/file"
    # The ID of your GCS object
    # destination_blob_name = "storage-object-name"
    bucket_name = "adopt-a-pal-pics"
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    # Optional: set a generation-match precondition to avoid potential race conditions
    # and data corruptions. The request to upload is aborted if the object's
    # generation number does not match your precondition. For a destination
    # object that does not yet exist, set the if_generation_match precondition to 0.
    # If the destination object already exists in your bucket, set instead a
    # generation-match precondition using its generation number.
    generation_match_precondition = 0

    blob.upload_from_filename(source_file_name, if_generation_match=generation_match_precondition)
    blob.make_public()
    return blob.public_url
    # print(
    #     f"File {source_file_name} uploaded to {destination_blob_name}."
    # )
    
    
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)