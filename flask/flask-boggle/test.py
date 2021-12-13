from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

class FlaskTests(TestCase):

    def setUp(self):
        """Before every test"""

        self.client = app.test_client()

        # Make Flask errors be real errors, not HTML pages with error info
        app.config['TESTING'] = True

        # This is a bit of hack, but don't use Flask DebugToolbar to avoid its HTML
        app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']
       
    def tearDown(self):
        """After each test."""
        #I'm setting up. Must I tear down? If so, what? 


    def test_startpage(self):
        """ Check that data is stored in session and that the base/start HTML is showing
            Corresponds to '/boggle' route at game-start
        """

        with self.client:
            response = self.client.get('/boggle')
            self.assertIn('board', session)
            self.assertIsNone(session.get('highscore'))
            self.assertIsNone(session.get('playcount'))
            self.assertIn(b'<p>Time left:', response.data)
            self.assertIn(b'Current Score:', response.data)
            self.assertIn(b'Rounds:', response.data)
            self.assertIn(b'Highscore:', response.data)

    def test_valid_word(self):
        """Check if word is valid using the board in session and '/validate' route"""

        with self.client as client:
            with client.session_transaction() as sess:
                sess['board'] = [["N", "E", "R", "T", "S"], 
                                 ["T", "A", "S", "T", "S"], 
                                 ["T", "E", "S", "T", "S"], 
                                 ["T", "E", "S", "T", "S"], 
                                 ["T", "E", "S", "T", "S"]]
        response = self.client.get('/validate?word=near')
        self.assertEqual(response.json['result'], 'ok')

    def test_not_found_word(self):
        """ Check if the word is in the dictionary
            Further check of 'boggle/validate' route 
        """

        self.client.get('/boggle') 
        response = self.client.get('/validate?word=practice')
        self.assertEqual(response.json['result'], 'not-on-board')

    def test_not_a_word(self):
        """Further check of '/validate' route """

        self.client.get('/boggle')
        response = self.client.get('/validate?word=123151')
        self.assertEqual(response.json['result'], 'not-word')

    def test_set_score(self):
        """Test '/set-score' route handling score, highscore, and playcount"""

       #What test would run here? Would I use sess['playcount'] to see if it increments?
    
    #Other potential tests:
    # Timer stops when countdown ends?
    # New high score replaces an old one? 
    # Whether a new game starts? 
