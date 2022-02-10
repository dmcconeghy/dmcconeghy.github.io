from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, BooleanField
from wtforms.validators import InputRequired, Optional, URL, NumberRange, AnyOf

class AddPetForm(FlaskForm):
    """Form for adding pets"""

    name = StringField("Name", 
                        validators=[InputRequired(message="Name required")])
    species = StringField("Species", 
                        validators=[InputRequired(message="Species required"), 
                                    AnyOf(values=["dog", "Dog", "Cat", "cat", "Porcupine", "porcupine"], message="Invalid Species. Only Cats, Dogs & Porcupines.")])
    photo_url = StringField("URL", 
                        validators=[Optional(), URL(message="Must be a URL")])
    age = IntegerField("Age", 
                        validators=[InputRequired(message="Age required"),NumberRange(min=0, max=30, message="Invalid Age")])
    notes =  TextAreaField("Notes", 
                        validators=[Optional()])
    available = BooleanField("Available")