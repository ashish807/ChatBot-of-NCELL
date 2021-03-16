import unicodedata
from flask import Flask, jsonify,render_template,make_response
from flask_restful import Api,Resource
import os
import pickle
import cv2
import numpy as np
from flask import url_for, send_from_directory, request
import logging, os
import requests
from flask import Flask, request 
import re
from databaseFetch import *
from werkzeug.utils import secure_filename
import playsound
from gtts import gTTS
app = Flask(__name__)
api=Api(app)
import playsound

file_handler = logging.FileHandler('server.log')
app.logger.addHandler(file_handler)
app.logger.setLevel(logging.INFO)


@app.route('/')
def home_page():
    return render_template('index.html')

@app.route('/upload', methods = ['POST'])
class Upload(Resource):
    def post(self,lang):
        if request.method == 'POST':
                finalResult=chatAnswer(lang)
                headers = {'Content-Type': 'text/html','charset':'utf-8'}
                if(finalResult!="No"):
                    myobj = gTTS(text=finalResult, lang="hi", slow=False)
                    audio_file ="welcome.mp3"
                    myobj.save(audio_file)
                    playsound.playsound(audio_file)
                    os.remove(audio_file)
                    return render_template('response.html',output=finalResult)
                else:
                    sorry ="Sorry, I cannot answer that at the moment but I will improve myself"
                    myobj = gTTS(text=sorry, lang="hi", slow=False)
                    audio_file ="welcome.mp3"
                    myobj.save(audio_file)
                    playsound.playsound(audio_file)
                    os.remove(audio_file)
                    return make_response(render_template('response.html',output=sorry),200,headers)
        else:
            return "Didn't received"



api.add_resource(Upload,"/upload/<string:lang>")
# api.add_resource(Audio, "/audio/<string:typeError>")



if __name__ == '__main__':
    print("Initiated program")
    app.run(debug=True)
