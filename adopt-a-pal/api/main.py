import datetime
import os
from google.cloud import datastore
from flask import Flask, jsonify, make_response,request, render_template
import constants
import json

# app = Flask(__name__)
app = Flask(__name__, static_folder='./build', static_url_path='/')
client = datastore.Client()
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

# Gets pets
@app.route('/api/pets', methods=['POST','GET'])
def lodgings_get_post():
    if request.method == 'POST':
        content = request.get_json()
        new_lodging = datastore.entity.Entity(key=client.key(constants.pals))
        new_lodging.update({"name": content["name"], "description":
        content["description"],
        "price": content["price"]})
        client.put(new_lodging)
        return str(new_lodging.key.id)
    if request.method == 'GET':
        query = client.query(kind=constants.pals)
        results = list(query.fetch())
        for e in results:
            e["id"] = e.key.id
        return json.dumps(results)
    else:
        return 'Method not recognized'

# edit pal data
@app.route('/api/<id>', methods=['PUT','DELETE','GET'])
def lodgings_put_delete(id):
    if request.method == 'PUT':
        content = request.get_json()
        lodging_key = client.key(constants.pals, int(id))
        lodging = client.get(key=lodging_key)
        lodging.update({"name": content["name"], "description":
        content["description"],
        "price": content["price"]})
        client.put(lodging)
        return ('',200)
    elif request.method == 'DELETE':
        key = client.key(constants.pals, int(id))
        client.delete(key)
        return ('',200)
    elif request.method == 'GET':
        lodging_key = client.key(constants.lodgings, int(id))
        lodging = client.get(key=lodging_key)
        return json.dumps(lodging)
    else:
        return 'Method not recognized'


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)
    # app.run(host='127.0.0.1', port=5000, debug=True)