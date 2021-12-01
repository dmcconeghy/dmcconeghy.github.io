def min_max_keys(d):
    """Return tuple (min-keys, max-keys) in d.

        >>> min_max_keys({2: 'a', 7: 'b', 1: 'c', 10: 'd', 4: 'e'})
        (1, 10)

    Works with any kind of key that can be compared, like strings:

        >>> min_max_keys({"apple": "red", "cherry": "red", "berry": "blue"})
        ('apple', 'cherry')
    """
    #extract the keys into a sortable list? 
    
    # lst = []
    # for keys in d :
    #     lst.append(keys)
    # lst.sort()
    # minmax = (lst[0], lst[-1])
    # return minmax

    keys = d.keys()

    return (min(keys), max(keys))