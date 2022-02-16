from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, EmailField
from wtforms.validators import InputRequired, Email, Length

class RegisterForm(FlaskForm):
    """ Form to Register a User """

    username = StringField("Username", validators=[InputRequired(), Length(min = 1, max=20)])
    password = PasswordField("Password", validators=[InputRequired(), Length(min=6, max=55)])
    first_name = StringField("First_Name", validators=[InputRequired(), Length(max=30)])
    last_name = StringField("Last_Name", validators=[InputRequired(), Length(max=30)])
    email = EmailField("Email", validators=[InputRequired(), Email(), Length(max=50)])

class LoginForm(FlaskForm):
    """ Form to Login a User """

    username = StringField("Username", validators=[InputRequired(), Length(min=1, max=20)])
    password = PasswordField("Password", validators=[InputRequired(), Length(min=6, max=55)])

class FeedbackForm(FlaskForm):
    """Form to add Feedback"""

    title = StringField("Title", validators=[InputRequired(), Length(max=100)])
    content = StringField("Content", validators=[InputRequired()])


class DeleteForm(FlaskForm):
    """ Delete form is blank """
