from flask import Flask
from flask_cors import CORS, cross_origin
import keyboard
import webbrowser
import os

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/dino")
@cross_origin()
def launch_dino():
    print("launching dino")
    url = 'https://chromedino.com/'
    with open('activeWindows.txt', 'a+') as f:
        f.write('dino')
    webbrowser.open_new(url)
    return {"message": "success"}

@app.route("/close")
@cross_origin()
def close_window():
    print("closing window")
    try:
        with open('activeWindows.txt', 'r') as f:
            if f.readlines() != []:
                keyboard.press_and_release('alt+f4')
                os.remove('activeWindows.txt')
    except:
        try:
            os.remove('activeWindows.txt')
        except:
            pass
    return {"message": "success"}

@app.route("/touch")
@cross_origin()
def up_arrow():
    print("touch")
    keyboard.press_and_release('space')
    return {"message": "success"}

if __name__ == '__main__':
    app.run(host="192.168.18.4", port=5000)