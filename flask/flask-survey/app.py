"""Satisfaction Survey"""

from flask import Flask, request, render_template, redirect, flash, session, make_response
from flask_debugtoolbar import DebugToolbarExtension
from surveys import surveys

app = Flask(__name__)

app.config['SECRET_KEY'] = "daves-secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

RESPONSES = "responses"
SURVEY = "survey"

@app.route("/")
def show_pick_survey_form():
    """Show pick-a-survey form."""

    return render_template("choose-survey.html", surveys=surveys)

@app.route("/", methods=["POST"])
def select_survey():
    """"User begins by selecting a survey"""

    survey_id = request.form['survey_id']
    survey = surveys[survey_id]
    session[SURVEY] = survey_id
    responses = session.get(RESPONSES)

    # don't let them re-take a survey until cookie times out
    if request.cookies.get(f"completed_{survey_id}"):
        return render_template("complete.html", survey=survey, responses=responses)

    return render_template("start.html", survey=survey)

@app.route("/start", methods=["POST"])
def start_survey():
    """Next we clear the responses and redirect ask the survey questions."""

    session[RESPONSES] = []

    return redirect("/questions/0")

@app.route("/questions/<int:qid>")
def show_questions(qid):
    """Display the current qnum question"""
    responses = session.get(RESPONSES)
    survey_id = session[SURVEY]
    survey = surveys[survey_id]

    if (responses is None):
        return redirect("/")
    
    if (len(responses) == len(survey.questions)):
        return redirect("/finish")

    if (len(responses) != qid):
        flash(f"This isn't the right question!")
        return redirect(f"/questions/{len(responses)}")
    
    question = survey.questions[qid]
    return render_template("question.html", question_num=qid, question=question)

@app.route("/answer", methods=["POST"])
def question_handler():
    """Collect each answer and then prep the next question"""

    # handle answers, both options and text
    choice = request.form['answer']
    text = request.form.get("text", "")

    # add the responses to the responses list
    responses = session[RESPONSES]
    responses.append({"choice": choice, "text": text})

    # add the response
    session[RESPONSES] = responses
    survey_id = session[SURVEY]
    survey = surveys[survey_id]

    if (len(responses) == len(survey.questions)):
        return redirect("/complete")

    else:
        return redirect(f"/questions/{len(responses)}")

@app.route("/complete")
def complete():
    """Show completed survey with answers"""

    responses = session[RESPONSES]
    survey_id = session[SURVEY]
    survey = surveys[survey_id]

    html = render_template("complete.html",
                           survey=survey,
                           responses=responses)

  # Set cookie so they can't re-take this survey
    response = make_response(html)
    response.set_cookie(f"completed_{survey_id}", "yes", max_age=60)
    return response
    


