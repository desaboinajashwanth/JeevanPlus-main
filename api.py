from flask import Flask,redirect, url_for, request
from flask_cors import CORS, cross_origin
from werkzeug.exceptions import HTTPException
from time import sleep

app = Flask(__name__)
cors = CORS(app)


HOSTED_URL = "http://f3ee-34-125-236-31.ngrok.io/"


@app.route('/', methods = ['POST', 'GET'])
@cross_origin()
def hello_world():
   return {"HOSTED_URL": HOSTED_URL}



@app.errorhandler(HTTPException)
def handle_exception(e):
    response = e.get_response()
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response

if __name__ == '__main__':
   app.run(port = 9001, debug=True)