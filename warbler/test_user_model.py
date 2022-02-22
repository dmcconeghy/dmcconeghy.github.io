"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from plistlib import UID
from unittest import TestCase
from sqlalchemy import exc

from models import db, User, Message, Follows

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()


class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        db.drop_all()
        db.create_all()

        u1 = User.signup("test1", "email1@email.com", "password", None)
        uid1 = 1111
        u1.id = uid1

        u2 = User.signup("test2", "email2@email.com", "password", None)
        uid2 = 2222
        u2.id = uid2

        db.session.commit()

        u1 = User.query.get(uid1)
        u2 = User.query.get(uid2)

        self.u1 = u1
        self.uid1 = uid1

        self.u2 = u2
        self.uid2 = uid2

        self.client = app.test_client()

    def tearDown(self):
        res = super().tearDown()
        db.session.rollback()
        return res

    def test_user_model(self):
        """Does basic model work?"""

        u = User(
            email="test@test.com",
            username="testuser",
            password="HASHED_PASSWORD"
        )

        db.session.add(u)
        db.session.commit()

        # User should have no messages & no followers
        self.assertEqual(len(u.messages), 0)
        self.assertEqual(len(u.followers), 0)

    def test_user_following(self):
        """Does following work?"""

        # U1 follows u2
        self.u1.following.append(self.u2)
        db.session.commit()

        # Is the following/followers count right?
        self.assertEqual(len(self.u2.following), 0)
        self.assertEqual(len(self.u2.followers), 1)
        self.assertEqual(len(self.u1.following), 1)
        self.assertEqual(len(self.u1.followers), 0)

        # Are the following/followed ids right?
        self.assertEqual(self.u2.followers[0].id, self.u1.id)
        self.assertEqual(self.u1.following[0].id, self.u2.id)

    def test_is_following(self):
        """Does the is following work? """

        # u1 follows u2
        self.u1.following.append(self.u2)
        db.session.commit()

        # u1 follows u2 | u2 follows u1
        self.assertTrue(self.u1.is_following(self.u2))
        self.assertFalse(self.u2.is_following(self.u1))

    def test_is_followed_by(self):
        """Does the is followed by work? """

        # u1 follows u2
        self.u1.following.append(self.u2)
        db.session.commit()

        # u2 followed by u1 | u1 followed by u2
        self.assertTrue(self.u2.is_followed_by(self.u1))
        self.assertFalse(self.u1.is_followed_by(self.u2))

# SIGN UP tests

def test_valid_signup(self):
    """Is a valid signup accepted?"""
    u_test = User.signup("testtester", "tester@test.com", "password", None)
    uid = 666
    u_test.id = uid
    db.session.commit()

    u_test = User.query.get(uid)
    # Did u_test add? 
    self.assertIsNotNOne(u_test)

    # Did the fields populate with valid data?
    self.asserEqual(u_test.username, "testtester")
    self.asserEqual(u_test.email, "tester@test.com")
    self.asserEqual(u_test.password, "password")

    # special check for bcrypt password hash
    self.assertTrue(u_test.password.startswith("$2b$"))

# username can't be empty
def test_invalid_username_signup(self):
    """Is an invalid username rejected?"""
    invalid = User.signup(None, "tester@test.com", "password", None)
    uid = 420
    invalid.id = uid
    with self.assertRaises(exc.IntegrityError) as context:
        db.session.commit()

# email can't be empty
def test_invalid_email_signup(self):
    """Is an invalid email rejected?"""
    invalid = User.signup("testtester", None, "password", None)
    uid = 256
    invalid.id = uid
    with self.assertRaises(exc.IntegrityError) as context:
        db.session.commit()

# password can't be empty
# Why was this test written without invalid, uid, invalid.id? 
def test_invalid_password_signup(self):
    """Is an invalid password rejected?"""
    #empty string
    with self.assertRaises(ValueError) as context:
        User.signup("testtester", "tester@test.com", "", None)
    # None
    with self.assertRaises(ValueError) as context:
        User.signup("testtester", "tester@test.com", None, None)

# AUTHENTICATION

def test_valid_authentication(self):
    """"Is a valid user authenticated?"""
    # if we call authenticate with the test username and password
    # And those entries are not None
    # Is the returned u = to our test uid1
    u = User.authenticate(self.u1.username, "password")
    self.assertIsNotNone(u)
    self.assertEqual(u.id, self.uid1)

# What happens if the username is bad?
def test_invalid_username(self):
    """Is an invalid username rejected?"""
    self.assertFalse(User.authenticate("baduser", "password"))

# What happens if the password is bad?
def test_invalid_password(self):
    """Is an invalid password rejected?"""
    self.assertFalse(User.authenticate(self.u1.username, "badpassword"))