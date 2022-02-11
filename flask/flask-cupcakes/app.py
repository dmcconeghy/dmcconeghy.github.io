"""Flask app for Cupcakes"""

from flask import Flask, jsonify, render_template, request
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Cupcake

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///cupcakes"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'davespetsecret'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.debug = True
toolbar = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def root():
    """Homepage"""
    

    return render_template("/index.html")

@app.route('/api/cupcakes')
def list_cupcakes():
    """Return JSON: {cupcakes: [{id, flavor, size, rating, image}, ...]}"""

    cupcakes = [cupcake.to_dict() for cupcake in Cupcake.query.all()]

    return jsonify(cupcakes=cupcakes)

@app.route('/api/cupcakes/<cupcake_id>')
def show_cupcake(cupcake_id):
    """Returns JSON: {cupcake: {id, flavor, size, rating, image}}"""

    cupcake = Cupcake.query.get_or_404(cupcake_id)

    return jsonify(cupcake=cupcake.to_dict())

@app.route('/api/cupcakes', methods=["POST"])
def create_cupcake():
    """ 
    Create cupcake with request data, 
    return JSON: {cupcake: {id, flavor, size, rating, image}}
    """
    data = request.json

    new_cupcake = Cupcake(
        flavor = data["flavor"],
        size = data["size"],
        rating = data["rating"],
        image = data["image"] or None)
        

    db.session.add(new_cupcake)
    db.session.commit()

    return (jsonify(cupcake=new_cupcake.todict()), 201)
    # return jsonify(cupcake=serialized)

@app.route('/api/cupcakes/<cupcake_id>', methods=["PATCH"])
def patch_cupcake(cupcake_id):
    """
    Update cupcake with request data
    Returns JSON: {cupcake: {id, flavor, size, rating, image}}
    """

    data = request.json

    cupcake = Cupcake.query.get_or_404(cupcake_id)

    cupcake.flavor = data('flavor', cupcake.flavor)
    cupcake.size = data('size', cupcake.size)
    cupcake.rating = data('rating', cupcake.rating)
    cupcake.image = data('image', cupcake.image)

    db.session.add(cupcake)
    db.session.commit()

    return jsonify(cupcake=cupcake.to_dict())

@app.route('/api/cupcakes/<cupcake_id>', methods=["DELETE"])
def delete_cupcake(cupcake_id):
    """ 404 or delete cupcake"""
    cupcake = Cupcake.query.get_or_404(cupcake_id)

    db.session.delete(cupcake)
    db.session.commit()
    
    return jsonify(message="Deleted")