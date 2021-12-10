from flask.json import jsonify
from boggle import Boggle
from flask import Flask, render_template, request, session
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config['SECRET_KEY'] = "daves-boggle"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

boggle_game = Boggle()
BOARD = "board"

@app.route("/")
def home_page():
    """ User selects start to start a boggle game"""

    return render_template("start.html")

@app.route("/boggle")
def boggle_start():
    """ Boggle board appears"""

    board = boggle_game.make_board()
    session[BOARD] = board
    

    return render_template("boggle.html", board=board)

@app.route("/validate")
def validate_submission():
    """ Check the dictionary for the submitted word.
        Returns JSON for JS use.
    """

    submission = request.args["submit_word"]
    board = session[BOARD]
    check = boggle_game.check_valid_word(board, submission)

    return jsonify({'result': check})

