def sum_up_diagonals(matrix):
    """Given a matrix [square list of lists], return sum of diagonals.

    Sum of TL-to-BR diagonal along with BL-to-TR diagonal:

        >>> m1 = [
        ...     [1,   2],
        ...     [30, 40],
        ... ]
        >>> sum_up_diagonals(m1)
        73

        >>> m2 = [
        ...    [1, 2, 3],
        ...    [4, 5, 6],
        ...    [7, 8, 9],
        ... ]
        >>> sum_up_diagonals(m2)
        30
    """
    # TL to BR is [x][x] where x is len of list entries increments +1 for each
    # BL to TR is last of first row, last - 1 of next row +1 so [i][-1] then [i+1][-2]

    # total = matrix[0][0] + matrix[1][1]
    # total += matrix[0][1] + matrix [1][0]

    # total = m2[0][0] + m2[1][1] + m2[2][2]
    # total += m2[0][2] + m2[1][1] + m2[2][0]
    
    total = 0

    for idx in range(len(matrix)):
        total += matrix[idx][idx]
        total += matrix[idx][-1 - idx]
    return total
