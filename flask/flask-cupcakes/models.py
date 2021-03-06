"""Models for Cupcake app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

default_image = "https://tinyurl.com/demo-cupcake"

class Cupcake(db.Model):
    """A delicious cupcake"""

    __tablename__ = "cupcakes"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flavor = db.Column(db.Text, nullable=False)
    size = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float)
    image = db.Column(db.Text, nullable=False, default=default_image)

def connect_db(app):

    db.app = app
    db.init_app(app)