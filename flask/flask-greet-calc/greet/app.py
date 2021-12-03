from flask import Flask 

app = Flask(__name__)

@app.route('/welcome')
def welcome():
    """Return a greeting"""

    return "welcome"

@app.route('/welcome/home')
def welcome_home():
    """Return a greeting"""

    return "welcome home"

@app.route('/welcome/back')
def welcome_back():
    """Return a greeting"""

    return "welcome back"