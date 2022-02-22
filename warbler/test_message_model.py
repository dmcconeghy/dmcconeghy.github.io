"""Message model tests."""

# run these tests like:
#
#    python -m unittest test_message_model.py


import os
from plistlib import UID
from unittest import TestCase

from models import db, User, Message, Likes

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

        self.uid = 112358
        u = User.signup("test1", "email1@email.com", "password", None)
        u.id = self.uid

        db.session.commit()

        self.u = User.query.get(self.uid)

        self.client = app.test_client()

    def tearDown(self):
        res = super().tearDown()
        db.session.rollback()
        return res

    def test_user_model(self):
        """Does basic model work?"""

        m = Message(
            text = "Sample Warble",
            user_id = self.uid
        )

        db.session.add(m)
        db.session.commit()

        # User should have no messages & no followers
        self.assertEqual(len(self.u.messages), 1)
        self.assertEqual(self.u.messages[0].text, "Sample Warble")

    def test_message_liking(self):
        """Does liking a message work?"""

        m1 = Message(
            text = "Sample Warble",
            user_id = self.uid
        )

        m2 = Message(
            text = "Sample Warble",
            user_id = self.uid
        )

        u = User.signup("Tester2", "test@test.com", "password", None)
        uid = 44444
        u.id = uid
        db.session.add_all([m1, m2, u])
        db.session.commit()

        #add m1 to our user's likes
        u.likes.append(m1)

        db.session.commit()

        #
        l = Likes.query.filter(Likes.user_id == uid).all()
        self.assertTrue(len(l), 1)
        self.assertEqual(l[0].message_id, m1.id)


   