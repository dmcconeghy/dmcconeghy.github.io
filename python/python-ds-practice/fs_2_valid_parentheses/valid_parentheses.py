def valid_parentheses(parens):
    """Are the parentheses validly balanced?

        >>> valid_parentheses("()")
        True

        >>> valid_parentheses("()()")
        True

        >>> valid_parentheses("(()())")
        True

        >>> valid_parentheses(")()")
        False

        >>> valid_parentheses("())")
        False

        >>> valid_parentheses("((())")
        False

        >>> valid_parentheses(")()(")
        False
    """

    # if parens.count("(") == parens.count(")"):
    #     return True 
    # else :
    #     return False

    # Sample code fails on this final test, too.
    # To get the final to pass I'd strip matching characters off the front/back of parens with a/b pointers
    # If a pair didn't match then the parens would be invalid.    
    
    count = 0

    for p in parens:
        if p == '(':
            count += 1
        elif p == ')':
            count -= 1

        # fast fail: too many right parens
        if count < 0:
            return False

    return count == 0