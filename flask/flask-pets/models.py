"""SQLAlchemy models for Pet Adoption Agency."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

default_image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7MbPoOyfHbk4m7CWHszPqC2LrauOjacZhSg&usqp=CAU"

class Pet(db.Model):
    """An adoptable pet"""

    __tablename__ = "pets"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False)
    species = db.Column(db.Text, nullable=False)
    photo_url = db.Column(db.Text)
    age = db.Column(db.Integer)
    notes = db.Column(db.Text)
    available = db.Column(db.Boolean, nullable=False, default=True)

    def image_url(self):
        """ Default or User Provided image"""

        return self.photo_url or default_image

def connect_db(app):

    db.app = app
    db.init_app(app)