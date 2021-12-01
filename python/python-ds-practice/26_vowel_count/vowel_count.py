def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}
        
        >>> vowel_count('HOW ARE YOU? i am great!') 
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """
    # This code is correct but fails test #2 because it returns vowels in predefined aeiou order
    # lowercase = phrase.lower()
    # vowels = {}

    # for vowel in "aeiou" :
    #     count = lowercase.count(vowel)
    #     if count != 0 :
    #         vowels[vowel] = count
    # return vowels

    VOWELS = set("aeiou")

    phrase = phrase.lower()
    counter = {}

    for letter in phrase :
        if letter in VOWELS :
            counter[letter] = counter.get(letter, 0) + 1
    return counter