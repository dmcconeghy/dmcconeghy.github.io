
def add(x):
    return x * 2

gen = map(add, [2,3,4,5])

[print(item) for item in gen]