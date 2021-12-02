"""Word Finder: finds random words from a dictionary."""

from random import choice as choice

class WordFinder:
    ...
    """
    Opens a file with words, one per line
    Make a list of the words
    Print the number of words read

    random() returns random word
    >>> wf = WordFinder("simple.txt")
    3 words read

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True  
    """

    def __init__(self, filepath):
        data = open(filepath)
        self.words = self.process(data)
        print(f"{len(self.words)} words read")

    def process(self, data):
        """Return cleaned data"""
        return [word.strip() for word in data]

    def random(self):
        """Returns a random word"""
        return choice(self.words)

class SpecialWordFinder(WordFinder):
    """Specialized WordFinder that excludes blank lines/comments.
    
    >>> swf = SpecialWordFinder("complex.txt")
    3 words read

    >>> swf.random() in ["pear", "carrot", "kale"]
    True

    >>> swf.random() in ["pear", "carrot", "kale"]
    True

    >>> swf.random() in ["pear", "carrot", "kale"]
    True
    """

    def process(self, data):
        return [line.strip() for line in data if line.strip() and not line.startswith('#')]