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
        new_lodging = datastore.entity.Entity(key=client.key(constants.lodgings))
        new_lodging.update({"name": content["name"], "description":
        content["description"],
        "price": content["price"]})
        client.put(new_lodging)
        return str(new_lodging.key.id)
    elif request.method == 'GET':
        query = client.query(kind=constants.lodgings)
        results = list(query.fetch())
        for e in results:
            e["id"] = e.key.id
        return json.dumps(results)
    else:
        return 'Method not recognized'


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)
    # app.run(host='127.0.0.1', port=5000, debug=True)