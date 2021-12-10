from boggle import Boggle
from flask import Flask, render_template, session
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config['SECRET_KEY'] = "daves-boggle"

debug = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route("/")
def start_page():
    """ User begins boggle game"""

    return render_template("start.html")