from flask import Flask
from flask_cors import CORS, cross_origin
import keyboard


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
@cross_origin()
def process_control():
    print("Touch")
    keyboard.press_and_release('space')
    return "success"

if __name__ == '__main__':
    app.run("192.168.18.8")