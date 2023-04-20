import datetime
import os
from google.cloud import datastore

from flask import Flask, jsonify, make_response, render_template

# app = Flask(__name__)
app = Flask(__name__, static_folder='./build', static_url_path='/')

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

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)
    # app.run(host='127.0.0.1', port=5000, debug=True)