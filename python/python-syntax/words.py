def print_upper_words(words):
        """Enter words and get an uppercase version back"""
        for word in words :
            print(word.upper())

print_upper_words(["hello", "hey", "goodbye", "yo", "yes"])

def print_upper_words_by_char(words):
    """Enter words and get an uppercase version back if it starts with H"""
    for word in words :
        if word.startswith("h"):
            print(word.upper())

print_upper_words_by_char(["hello", "hey", "goodbye", "yo", "yes"])

def print_upper_word_with_char(words, char):
        """Enter words and char get an uppercase version back if it starts with that char"""
        for word in words : 
            if word.startswith(char):
                print(word.upper())

print_upper_word_with_char(["hello", "hey", "goodbye", "yo", "yes"], "y")

def print_upper_word_with_characters(words, chars):
        """Enter words and char get an uppercase version back if it starts with that char"""
        for word in words : 
            for char in chars:
                if word.startswith(char):
                    print(word.upper())

print_upper_word_with_characters(["hello", "hey", "goodbye", "yo", "yes"], ["y", "g"])