import datetime
import os
import json
from google.cloud import datastore
from flask import Flask, jsonify, make_response, render_template, request, Response


# app = Flask(__name__)
app = Flask(__name__, static_folder='./build', static_url_path='/')
client = datastore.Client()


ANIMALS = "animals"

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

INVALID_INPUT = {
    "ERROR" : "INVALID INPUT."
}

@app.route('/')
def root():
    # return render_template('index.html')
    return app.send_static_file('index.html')

@app.route("/api/endpoint", methods=["GET"])
def endpoint():
    resp = make_response({"cat": 15})
    resp.headers["Access-Control-Allow-Origin"] = "*"
    return resp

@app.route('/api/hello')
def hello():
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
            "added": datetime.datetime.now()
        }

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

@app.route("/api/animals/<eid>", methods=["GET", "PATCH", "DELETE"])
def animal_get_patch_delete(eid):
    if request.method == "GET":

        try:
            int(eid)
        except ValueError:
            return Response(json.dumps(INVALID_INPUT), status=403,
                        mimetype='application/json')

        animal_key = client.key(ANIMALS, int(eid))
        res = client.get(animal_key)

        if not res:
            return Response(json.dumps(ANIMAL_NOT_FOUND), status=404,
                        mimetype='application/json')

        res["id"] = int(eid)

        return Response(json.dumps(res, default=str), status=200,
                        mimetype='application/json')


    elif request.method == "PATCH":
        pass

    elif request.method == "DELETE":
        pass

    else:
        return Response(json.dumps(ERROR_405), status=405,
                        mimetype='application/json')

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)