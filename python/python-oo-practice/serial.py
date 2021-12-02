"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    def __init__(self, start=0):
        """Create the start number to increment"""
        self.start = self.incremented = start
    
    def generate(self):
        """Increments the start number"""
        self.incremented += 1
        return self.incremented - 1
    
    def reset(self):
        """Resets incremeted number to start"""
        self.incremented = self.start

    def __repr__(self):
        """Show representation"""
        return f"<SerialGenerator start={self.start} next={self.next}>"
