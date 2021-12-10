from boggle import Boggle
from flask import Flask, render_template, request, session, flash
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config['SECRET_KEY'] = "daves-boggle"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

boggle_game = Boggle()
BOARD = "board"
ANSWERS = "answers"

@app.route("/")
def home_page():
    """ User selects start to start a boggle game"""

    return render_template("start.html")

@app.route("/boggle", methods=["POST"])
def boggle_start():
    """ Boggle board appears"""

    board = boggle_game.make_board()
    session[BOARD] = board

    return render_template("boggle.html", board=board)

@app.route("/submission", methods=["POST"])
def submission_handler():
    """This collects the answer & checks its validity
        If valid, it then appends the words found list.
        Then it scrubs the text form and awaits a new submission
    """
    #get the answers list
    answers = session[ANSWERS]

    #get the answer
    answer = request.form['submit_word']
    
    #check if valid word and append or reject
    if boggle_game.check_valid_word(answer):
        answers.append(answer)
        flash(f"Great! We added that word to your list.")
    else :
        flash(f"Sorry, that isn't a valid word.")
    
    # Get the board from the session to re-pass on load
    board = session[BOARD]


    return render_template("boggle.html", 
                            board=board, 
                            )