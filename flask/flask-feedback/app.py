
from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Feedback
from forms import RegisterForm, LoginForm, FeedbackForm, DeleteForm
from sqlalchemy import exc
from werkzeug.exceptions import Unauthorized

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///feedback"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config['SECRET_KEY'] = 'davesfeedbacksecret'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

app.debug = True

connect_db(app)
db.create_all()

toolbar = DebugToolbarExtension(app)

@app.route('/')
def root():
    """ Homepage redirect to register """

    if "username" in session:
        return redirect(f"/users/{session['username']}")

    return redirect("/register")

@app.route('/register', methods=['GET', 'POST'])
def register_user():
    """ Show a register form """

    if "username" in session:
        return redirect(f"/users/{session['username']}")

    form=RegisterForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        email = form.email.data

        new_user = User.register(username, password, first_name, last_name, email)

        db.session.commit()
        session['username'] = new_user.username

        flash('Welcome! New Account Created', "success")
        return redirect(f"/users/{new_user.username}")

    return render_template("/users/register.html", form=form)

@app.route('/login', methods=['GET', 'POST'])
def login_user():
    """ User login """
    
    form = LoginForm()

    if "username" in session:
        return redirect(f"/users/{session['username']}")

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)

        if user:
            flash(f"Welcome Back, {user.username}!", "primary")
            session['username'] = user.username
            return redirect(f"/users/{session['username']}")
        else:
            form.username.errors = ['Invalid username/password.']

    return render_template('/users/login.html', form=form)

@app.route('/users/')
def redirect_users():
    """ If by mistake someone arrives here."""
    return redirect('/')

@app.route('/users/<username>')
def show_user(username):
    """Logged in user homepage"""

    if "username" not in session or username != session['username']:
        raise Unauthorized()

    user = User.query.get(username)
    form=DeleteForm()

    return render_template("/users/show.html", user=user, form=form)

@app.route('/users/<username>/delete', methods=["POST"])
def delete_user(username):
    """Delete a user"""

    if "username" not in session or username != session['username']:
        raise Unauthorized()

    user = User.query.get(username)
    flash(f"Deleted user, {session['username']}!", "success")
    db.session.delete(user)
    db.session.commit()
    session.pop("username")

    return redirect("/")

@app.route('/users/<username>/feedback/new', methods=["GET", "POST"])
def add_user_feedback(username):

    if "username" not in session or username != session['username']:
        raise Unauthorized()
    
    form=FeedbackForm()

    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data

        feedback = Feedback(
            title = title,
            content = content,
            username = username
        )

        db.session.add(feedback)
        db.session.commit()

        return redirect(f"/users/{feedback.username}")
    
    else:
        return render_template("feedback/new.html", form=form)

@app.route('/feedback/<int:feedback_id>/edit', methods=["GET", "POST"])
def update_user_feedback(feedback_id):

    feedback = Feedback.query.get(feedback_id)

    if "username" not in session or feedback.username != session['username']:
        raise Unauthorized()
    
    form=FeedbackForm(obj=feedback)

    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data

        db.session.commit()

        return redirect(f"/users/{feedback.username}")
    
    else:
        return render_template("feedback/edit.html", form=form, feedback=feedback)

@app.route('/feedback/<int:feedback_id>/delete', methods=["POST"])
def delete_user_feedback(feedback_id):

    feedback = Feedback.query.get(feedback_id)

    if "username" not in session or feedback.username != session['username']:
        raise Unauthorized()
    
    form=DeleteForm()

    if form.validate_on_submit():
        db.session.delete(feedback)
        db.session.commit()

    return redirect(f"/users/{feedback.username}")

@app.route("/logout")
def logout():
    """Logout route."""

    if "username" in session:
        flash(f"Logged out, {session['username']}!", "primary")
        session.pop("username")
        return redirect("/login")
    else:
         return redirect("/")

    