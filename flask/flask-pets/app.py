from flask import Flask, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet
from forms import AddPetForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///pets"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'davespetsecret'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.debug = True
toolbar = DebugToolbarExtension(app)

connect_db(app)
db.create_all()



@app.route('/')
def root():
    """Homepage"""
    
    pets = Pet.query.all()

    return render_template("/homepage.html", pets=pets)

@app.route("/add", methods=["GET", "POST"])
def add_pet():
    """Add a pet form and handling"""

    form = AddPetForm()

    if form.validate_on_submit():
        data = {k: v for k, v in form.data.items() if k != "csrf_token"}
        new_pet = Pet(**data)
        db.session.add(new_pet)
        db.session.commit()
        flash(f"Added {new_pet.name}({new_pet.age}) the {new_pet.species}")
        return redirect("/")
    else:
        return render_template("add_pet_form.html", form=form)

@app.route("/pets/<int:id>", methods=["GET", "POST"])
def show_Pet(id):

    pet = Pet.query.get_or_404(id)
    form = AddPetForm(obj=pet)
    
    if form.validate_on_submit():
        pet.name=form.name.data
        pet.species=form.species.data
        pet.photo_url=form.photo_url.data
        pet.age=form.age.data
        pet.notes=form.notes.data
        pet.available=form.available.data
        db.session.commit()
        flash(f"{pet.name} updated.")
        return redirect('/')
    else:
        return render_template("show_pet.html", pet=pet, form=form)
