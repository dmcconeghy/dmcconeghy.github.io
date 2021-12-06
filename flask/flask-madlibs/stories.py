# Story Class
class Story:
    """Madlibs story.

    To  make a story, pass a list of prompts, and the text of the template.

        >>> s = Story(["noun", "verb"],
        ...     "I love to {verb} a good {noun}.")

    To generate text from a story, pass in a dictionary-like thing of {prompt: answer, promp:answer):

        >>> ans = {"verb": "eat", "noun": "mango"}
        >>> s.generate(ans)
        'I love to eat a good mango.'
    """

    def __init__(self, ref, title, words, text):
        """Create story with words and template text."""
        self.ref = ref
        self.title = title
        self.prompts = words
        self.template = text

    def generate(self, answers):
        """Substitute answers into text."""

        text = self.template

        for (key, val) in answers.items():
            text = text.replace("{" + key + "}", val)

        return text


# Here's a story to get you started
storyA = Story(
    "Once",
    "Once upon a time",
    ["place", "noun", "verb", "adjective", "plural_noun", "noun", "emotion"],
    """Once upon a time in a long-ago {place}, there lived a
       large {adjective} {noun}. It loved to {verb} {plural_noun}.
       One day it found a {noun}. It was so {emotion}.
    """
)

storyB = Story(
    "Twice",
    "Twice upon a time",
    ["plural_noun", "adjective", "adjective", "adjective", "time", "adjective", "plural_noun", "verb", "noun", "verb"],
    """Can you believe it? {plural_noun} exist! They're so {adjective} and {adjective}.
        They weren't always like that. They used to be {adjective}. But one {time}, all the {adjective}{plural_noun} came.
        Nothing was the same again. That was the day they {verb} the {noun} and everything {verb} for ever.
    """

)

stories = {s.ref: s for s in [storyA, storyB]}