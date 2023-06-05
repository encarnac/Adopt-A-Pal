import datetime
import os, sys
import json
import uuid
from google.cloud import datastore, storage
from flask import Flask, jsonify, make_response, request, Response
import random
import bcrypt
import jwt
from functools import wraps
from werkzeug.utils import secure_filename

sys.path.insert(0, os.getcwd()+"/GCP_func")
sys.path.append(os.path.abspath("/adopt-a-pal/api"))
# from GCP_func import upload_pic, bucket_metadata

app = Flask(__name__, static_folder='./build', static_url_path='/')
client = datastore.Client()


ANIMALS = "animals"

USERS = "users"

MISSING_DISPOSITIONS = {
    "ERROR": "ANIMAL REQUIRES ATLEAST ONE DISPOSITION."
}

REQUIRED_ANIMAL_ATTRIBUTES = ["name", "species", "breed", "availability"]

MISSING_ATTRIBUTES = {
    "ERROR": "ANIMAL MISSING REQUIRED ATTRIBUTES (NAME, SPECIES, BREED, AVAILABILITY)."
}

ANIMAL_NOT_FOUND = {
    "ERROR": "ANIMAL NOT FOUND."
}

USER_NOT_FOUND = {
    "ERROR": "USER DOES NOT EXIST"
}

USER_BAD_PERM = {
    "ERROR": "USER DOES NOT HAVE PERMISSSION TO ACCESS THIS"
}

INVALID_INPUT = {
    "ERROR" : "INVALID INPUT."
}

PIC_ATTRIBUTES = ["pic1", "pic2", "pic3"]

PLACEHOLDER_IMAGE = "https://storage.googleapis.com/adopt-a-pal-pics/placeholder.jpg"

REQUIRED_DISPOSITIONS = ["disposition_animals", "disposition_children", "disposition_leash"]

REQUIRED_USER_ATTRIBUTES = ["firstname", "lastname", "address", "city", "state", "phone", "email", "password"]

MISSING_USER_ATTRIBUTES = {
    "ERROR": "USER MISSING REQUIRED ATTRIBUTES (firstname, lastname, address, city, state, phone, email, password)."
}

EMAIL_IN_USE = {
    "ERROR": "THIS EMAIL ADDRESS IS ALREADY IN USE."
}

REQUIRED_SESSION_ATTRIBUTES = ["email", "password"]

MISSING_SESSION_ATTRIBUTES = {
    "ERROR": "Missing email or password."
}

INVALID_CREDS = {
    "ERROR": "Invalid credentials"
}

# UNDERSTAND THAT THIS IS NOT THE CORRECT OR SAFE WAY OF STORING SECRET KEY, ALSO THIS IS NOT A GOOD KEY 
app.config["SECRET_KEY"] = "thisisasecretkey"

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/api/hello')
def hello():
    # print(bucket_metadata("adopt-a-pal-pics"))
    return jsonify(message='Hello World!')

def admin_required_on_post_put_delete(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if (request.method == "POST") or (request.method == "PUT") or (request.method == "DELETE"):
            # checks if header contains token
            if "Authorization" in request.headers:
                token = request.headers.get('Authorization').split()[1]
            else:
                return Response(json.dumps("Missing token"), status=401,
                            mimetype='application/json')

            # try to decode
            try:
                decoded = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            except:
                return Response(json.dumps("Invalid token"), status=401,
                    mimetype='application/json')

            # if decoded jwt contains admin role continue
            if decoded["role"] == "admin":
                return f(*args, **kwargs)

            # else 403
            return Response(json.dumps("403 Forbidden"), status=403,
                mimetype='application/json')
        else:
            return f(*args, **kwargs)

    return decorated

def admin_required_on_get(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if (request.method == "GET"):
            # checks if header contains token
            if "Authorization" in request.headers:
                token = request.headers.get('Authorization').split()[1]
            else:
                return Response(json.dumps("Missing token"), status=401,
                            mimetype='application/json')

            # try to decode
            try:
                decoded = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            except:
                return Response(json.dumps("Invalid token"), status=401,
                    mimetype='application/json')

            # if decoded jwt contains admin role continue
            if decoded["role"] == "admin":
                return f(*args, **kwargs)

            # else 403
            return Response(json.dumps("403 Forbidden"), status=403,
                mimetype='application/json')
        else:
            return f(*args, **kwargs)

    return decorated

def admin_required_on_all(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        # checks if header contains token
        if "Authorization" in request.headers:
            token = request.headers.get('Authorization').split()[1]
        else:
            return Response(json.dumps("Missing token"), status=401,
                        mimetype='application/json')

        # try to decode
        try:
            decoded = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        except:
            return Response(json.dumps("Invalid token"), status=401,
                mimetype='application/json')

        # if decoded jwt contains admin role continue
        if decoded["role"] == "admin":
            return f(*args, **kwargs)

        # else 403
        return Response(json.dumps("403 Forbidden"), status=403,
            mimetype='application/json')


    return decorated

def admin_required_on_put_delete(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if (request.method == "PUT") or (request.method == "DELETE"):
            # checks if header contains token
            if "Authorization" in request.headers:
                token = request.headers.get('Authorization').split()[1]
            else:
                return Response(json.dumps("Missing token"), status=401,
                            mimetype='application/json')

            # try to decode
            try:
                decoded = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            except:
                return Response(json.dumps("Invalid token"), status=401,
                    mimetype='application/json')

            # if decoded jwt contains admin role continue
            if decoded["role"] == "admin":
                return f(*args, **kwargs)

            # else 403
            return Response(json.dumps("403 Forbidden"), status=403,
                mimetype='application/json')
        else:
            return f(*args, **kwargs)

    return decorated

@app.route('/api/animals', methods=["GET", "POST"])
@admin_required_on_post_put_delete
def animals():
    if request.method == "GET":
        query = client.query(kind=ANIMALS)

        availability = request.args.get("availability")
        species = request.args.get("species")
        breed = request.args.get("breed")
        disposition_animals = request.args.get("disposition_animals")
        disposition_children = request.args.get("disposition_children")
        disposition_leash = request.args.get("disposition_leash")

        if availability:
            query.add_filter("availability", "=", availability)

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

        date = request.args.get("date")
        today = datetime.date.today()
        
        search_date = None

        # if date (week, month, 6months) in parameters create a search date prior to current date

        if date == "week":
            # print("attempted to search by 1 week")
            search_date = today - datetime.timedelta(days=8)
            # print (search_date)
        elif date == "month":
            # print("attempted to search by 1 month")
            search_date = today - datetime.timedelta(days=32)
            # print (search_date)
        elif date == "6months":
            # print("attempted to search by 6 months")
            search_date = today - datetime.timedelta(days=183)
            # print (search_date)

        # if date was week, month, or 6months, return list of animals between then and now

        if search_date:
            temp = []
            for r in results:
                if search_date < datetime.date.fromtimestamp(r["added"].timestamp()) < today:
                    temp.append(r)

            results = temp



        for e in results:
            e["id"] = e.key.id
        return Response(json.dumps(results, default=str), status=200,
                        mimetype='application/json')
        
    elif request.method == "POST":
        content = request.form
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

        if (bool(content["disposition_animals"]) is not True) and (bool(content["disposition_children"]) is not True) and (bool(content["disposition_leash"]) is not True):
            return Response(json.dumps(MISSING_DISPOSITIONS), status=400,
                mimetype='application/json')

        dispositions = []

        # print(content["disposition_animals"])
        # print(content["disposition_children"])
        # print(content["disposition_leash"])
        if content.get("disposition_animals", "").lower() == "true":
            dispositions.append("Good with other animals")

        if content.get("disposition_children", "").lower() == "true":
            dispositions.append("Good with children")

        if content.get("disposition_leash", "").lower() == "true":
            dispositions.append("Animal must be leashed at all times")

        animal.update({
            "dispositions": dispositions
        })
        files = list(request.files.values())

        if len(files) == 0:
            animal['avatars'].append(PLACEHOLDER_IMAGE)
        else:
            for file in files:
                if file.filename == '':
                    animal['avatars'].append(PLACEHOLDER_IMAGE)
                else:
                    filename = secure_filename(file.filename)
                    pic_url = upload_pic(file.read(), filename)
                    animal['avatars'].append(pic_url)

        entity.update(animal)
        client.put(entity)
        eid = entity.key.id
        new_animal_key = client.key(ANIMALS, int(eid))
        res = client.get(key=new_animal_key)
        res["id"] = int(eid)
        return Response(json.dumps(res, default=str), status=201, mimetype='application/json')
    else:
        return jsonify(message='405')

@app.route("/api/animals/<eid>", methods=["GET", "PUT", "DELETE"])
@admin_required_on_post_put_delete
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

        if (bool(content["disposition_animals"]) is not True) and (bool(content["disposition_children"]) is not True) and (bool(content["disposition_leash"]) is not True):
            return Response(json.dumps(MISSING_DISPOSITIONS), status=400,
                mimetype='application/json')

        if bool(content["disposition_animals"]) is True:
            dispositions.append("Good with other animals")

        if bool(content["disposition_children"]) is True:
            dispositions.append("Good with children")

        if bool(content["disposition_leash"]) is True:
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
                pic_url = upload_pic(content[pic], content["name"] + str(prefix))
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

@app.route("/api/users", methods=["GET", "POST"])
@admin_required_on_get
def user_get_post():
    if request.method == "GET":
        query = client.query(kind=USERS)
        results = list(query.fetch())

        for e in results:
            e["id"] = e.key.id
        return Response(json.dumps(results, default=str), status=200,
                        mimetype='application/json')
    elif request.method == "POST":
        content = request.get_json()

        entity = datastore.Entity(key=client.key(USERS))

        for key in REQUIRED_USER_ATTRIBUTES:
            if key not in content:
                return Response(json.dumps(MISSING_USER_ATTRIBUTES), status=400,
                        mimetype='application/json')


        b = content["password"].encode("utf-8")
        salt = bcrypt.gensalt()

        user = {
            "firstname": content["firstname"],
            "lastname": content["lastname"],
            "address": content["address"],
            "city": content["city"],
            "state": content["state"],
            "phone": content["phone"],
            "email": content["email"],
            "password": bcrypt.hashpw(b, salt),
            "salt": salt,
            "pals":[]
        }

        # check if email already in datastore
        query = client.query(kind=USERS)
        query.add_filter("email", "=", user["email"])
        results = list(query.fetch())

        if len(results) > 0:
            return Response(json.dumps(EMAIL_IN_USE), status=409,
                mimetype='application/json')

        entity.update(user)
        client.put(entity)
        eid = entity.key.id
        new_user_key = client.key(USERS, int(eid))
        res = client.get(key=new_user_key)
        res["id"] = int(eid)
        del res["salt"]
        del res["password"]

        return Response(json.dumps(res, default=str), status=201,
                        mimetype='application/json')
    else:
        return Response(json.dumps("ERROR_405"), status=405,
                        mimetype='application/json')


@app.route("/api/users/<eid>", methods=["GET", "PUT", "DELETE"])
@admin_required_on_put_delete
def user_get_patch_delete(eid):
    try:
        int(eid)
    except ValueError:
        return Response(json.dumps(INVALID_INPUT), status=400,
                    mimetype='application/json')    

    if request.method == "GET":
        user_key = client.key(USERS, int(eid))
        res = client.get(user_key)

        if not res:
            return Response(json.dumps(USER_NOT_FOUND), status=404,
                        mimetype='application/json')

        res["id"] = int(eid)

        return Response(json.dumps(res, default=str), status=200,
                        mimetype='application/json')


    elif request.method == "PUT":
        content = request.get_json()

        # User Attributes: ["firstname", "lastname", "email", "city", "phone", "pals"]
        for key in REQUIRED_USER_ATTRIBUTES:
            if key not in content:
                return Response(json.dumps(MISSING_ATTRIBUTES), status=400,
                        mimetype='application/json')

        user_key = client.key(USERS, int(eid))
        res = client.get(user_key)

        if not res:
            return Response(json.dumps(USER_NOT_FOUND), status=404,
                        mimetype='application/json')


        for key in REQUIRED_USER_ATTRIBUTES:
            res[key] = content[key]


        # rehash and salt password
        b = content["password"].encode("utf-8")
        salt = bcrypt.gensalt()
        res["password"] = bcrypt.hashpw(b, salt)
        res["salt"] = salt

        client.put(res)

        res["id"] = int(eid)

        return Response(json.dumps(res, default=str), status=200,
                        mimetype='application/json')

    elif request.method == "DELETE":
        user_key = client.key(USERS, int(eid))
        res = client.get(user_key)

        if not res:
            return Response(json.dumps(USER_NOT_FOUND), status=404,
                        mimetype='application/json')

        client.delete(user_key)

        return Response(status=204)

    else:
        return Response(json.dumps("ERROR_405"), status=405,
                        mimetype='application/json')


@app.route('/api/sessions', methods=["POST"])
def login():
    if request.method == "POST":
        content = request.get_json()

        for attribute in REQUIRED_SESSION_ATTRIBUTES:
            if attribute not in content:
                return Response(json.dumps(MISSING_SESSION_ATTRIBUTES), status=400,
                        mimetype='application/json')

        query = client.query(kind="users")
        query.add_filter("email", "=", content["email"])
        results = list(query.fetch())

        # email not found
        if len(results) == 0:
            return Response(json.dumps(INVALID_CREDS), status=400,
                        mimetype='application/json')

        res = results[0]

        stored_username = res["email"]
        stored_password = res["password"]
        stored_salt = res["salt"]

        given_password = content["password"].encode("utf-8")
        given_hashed = bcrypt.hashpw(given_password, stored_salt)

        if given_hashed == stored_password:
            if stored_username == "admin@adoptapal.com":
                token = jwt.encode({"user": stored_username, "id": res.id, "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30), "role": "admin"}, app.config["SECRET_KEY"])
                return Response(json.dumps({"token": token}), status=200,
            mimetype='application/json')
            else:
                token = jwt.encode({"user": stored_username, "id": res.id, "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30), "role": "user"}, app.config["SECRET_KEY"])
                return Response(json.dumps({"token": token}), status=200,
            mimetype='application/json')

        return Response(json.dumps(INVALID_CREDS), status=400,
            mimetype='application/json')

    else:
        return Response(json.dumps("ERROR_405"), status=405,
                mimetype='application/json')

# for testing purposes
@app.route("/api/adminonly", methods=["GET"])
@admin_required_on_all
def adminonly():
    if request.method == "GET":
        return Response(json.dumps("Hello Admin"), status=200,
            mimetype='application/json')

    else:
        return Response(json.dumps("ERROR_405"), status=405,
            mimetype='application/json')



# Function takes user id and pal id, adds/removes pal id from user list of pals
# TODO verify user is admin or the current user.
@app.route("/api/users/<uid>/<eid>", methods=["POST", "DELETE"])
def user_add_delete_pal(uid, eid):
    try:
        int(uid)
        int(eid)
    except ValueError:
        return Response(json.dumps(INVALID_INPUT), status=403,
                    mimetype='application/json')    

    if request.method == "POST":
        res = client.get(client.key(USERS, int(uid)))
        if not res:
            return Response(json.dumps(USER_NOT_FOUND), status=404,
                        mimetype='application/json')
        
        if eid not in res["pals"]:
            res["pals"].append(eid)
        client.put(res)
        return Response(json.dumps(res, default=str), status=200,
                        mimetype='application/json')


    elif request.method == "DELETE":
        # res = client.get(client.key(USERS, int(uid)))
        user_key = client.key(USERS, int(uid))
        res = client.get(user_key)

        if not res:
            return Response(json.dumps(USER_NOT_FOUND), status=404,
                        mimetype='application/json')
        
        if eid in res["pals"]:
            res["pals"].remove(eid)
        client.put(res)

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

def upload_pic(file_data, filename):
    client = storage.Client()
    bucket_name = "adopt-a-pal-pics"
    bucket = client.bucket(bucket_name)

    # Generate a unique filename to avoid overwriting existing files
    unique_filename = secure_filename(os.path.splitext(filename)[0])  # Remove extension and sanitize filename
    file_extension = os.path.splitext(filename)[1]  # Get file extension
    unique_filename += str(uuid.uuid4().hex) + file_extension

    blob = bucket.blob(unique_filename)
    blob.upload_from_string(file_data, content_type="image/jpeg")
    blob.make_public()

    return blob.public_url

    
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)
