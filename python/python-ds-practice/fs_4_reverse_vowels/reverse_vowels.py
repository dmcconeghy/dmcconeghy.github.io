def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """

    VOWELS = set("aeiou")

    # using a list means we can using destructuring a,b = b,a
    string = list(s)

    # set our two pointers
    i = 0
    j = len(s) - 1

    # not a vowel? Increment I or decrement J
    # if in VOWELS swap values. Finish by changing back to a string
    while i < j :
        if string[i].lower() not in VOWELS :
            i += 1
        elif string[j].lower() not in VOWELS :
            j -= 1
        else :
            string[i], string[j] = string[j], string[i]
            i += 1
            j -= 1
    return "".join(string)
