from flask.json import jsonify
from boggle import Boggle
from flask import Flask, render_template, request, session 
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config['SECRET_KEY'] = "daves-boggle"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

boggle_game = Boggle()


@app.route("/")
def home_page():
    """ User selects start to start a boggle game"""

    return render_template("start.html")

@app.route("/boggle")
def boggle_start():
    """ Boggle board creation for DOM display"""

    board = boggle_game.make_board()
    session["board"] = board
    highscore = session.get("highscore", 0)
    playcount = session.get("playcount", 0)
    
    return render_template("boggle.html", board=board, highscore=highscore, playcount=playcount)

@app.route("/validate")
def validate_submission():
    """ Check the dictionary for the submitted word.
        Returns JSON for client JS use.
    """
    # Unclear why input name "submitted-word" doesn't work here but class "word" does
    check = boggle_game.check_valid_word(session["board"], request.args["word"])

    return jsonify({'result': check})

@app.route("/set-score", methods=["POST"])
def set_score():
    """Handles scores, high scores, and playcount"""
    score = request.json["score"]
    highscore = session.get("highscore", 0)
    playcount = session.get("playcount", 0)

    #update playcount, score/highscore
    session['playcount'] = playcount + 1
    session['highscore'] = max(score, highscore)

    
    return jsonify(newRecord = score > highscore)
