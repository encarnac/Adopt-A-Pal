import datetime
import os

from flask import Flask, jsonify, make_response, render_template

# app = Flask(__name__)
app = Flask(__name__, static_folder='./build', static_url_path='./build/static')

@app.route('/')
def root():
    # For the sake of example, use static information to inflate the template.
    # This will be replaced with real information in later steps.
    dummy_times = [datetime.datetime(2018, 1, 1, 10, 0, 0),
                   datetime.datetime(2018, 1, 2, 10, 30, 0),
                   datetime.datetime(2018, 1, 3, 11, 0, 0),
                   ]

    return render_template('index.html', times=dummy_times)

@app.route("/api/endpoint", methods=["GET"])
def endpoint():
    resp = make_response({"cat": 15})
    resp.headers["Access-Control-Allow-Origin"] = "*"
    return resp

@app.route('/api/hello')
def hello():
    return jsonify(message='Hello World!')

if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    # Flask's development server will automatically serve static files in
    # the "static" directory. See:
    # http://flask.pocoo.org/docs/1.0/quickstart/#static-files. Once deployed,
    # App Engine itself will serve those files as configured in app.yaml.
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)
    # app.run(host='127.0.0.1', port=5000, debug=True)
    
# [END gae_python3_render_template]
# [END gae_python38_render_template]


if __name__ == '__main__':
    app.run()