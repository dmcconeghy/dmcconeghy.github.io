Further Study

remove
This function should remove a node from a binary search tree. Your remove function should be able to handle removal of the root node, removal of a node with one child and removal of a node with two children. The function should return the node removed.

var binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(15)
binarySearchTree.insert(20)
binarySearchTree.insert(10)
binarySearchTree.insert(12)
binarySearchTree.insert(1)
binarySearchTree.insert(5)
binarySearchTree.insert(50);
binarySearchTree.remove(50);
binarySearchTree.root.right.value // 20
binarySearchTree.root.right.right // null

binarySearchTree.remove(5);
binarySearchTree.root.left.left.value // 1
binarySearchTree.root.left.left.right // null

var binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(15)
binarySearchTree.insert(20)
binarySearchTree.insert(10)
binarySearchTree.insert(12)
binarySearchTree.insert(1)
binarySearchTree.insert(5)
binarySearchTree.insert(50);

binarySearchTree.remove(1);
binarySearchTree.root.left.left.value // 5
binarySearchTree.root.left.left.left // null
binarySearchTree.root.left.left.right // null

binarySearchTree.remove(20);
binarySearchTree.root.right.value // 50
binarySearchTree.root.right.right // null
binarySearchTree.root.right.left // null

var binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(15)
binarySearchTree.insert(20)
binarySearchTree.insert(10)
binarySearchTree.insert(12)
binarySearchTree.insert(1)
binarySearchTree.insert(5)
binarySearchTree.insert(50)
binarySearchTree.insert(60)
binarySearchTree.insert(30)
binarySearchTree.insert(25)
binarySearchTree.insert(23)
binarySearchTree.insert(24)
binarySearchTree.insert(70);

binarySearchTree.remove(10);
binarySearchTree.root.left.value // 12
binarySearchTree.root.left.left.value // 1
binarySearchTree.root.left.left.right.value // 5

binarySearchTree.remove(50);
binarySearchTree.root.right.value // 20
binarySearchTree.root.right.right.value // 60
binarySearchTree.root.right.right.left.value // 30

var binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(22)
binarySearchTree.insert(49)
binarySearchTree.insert(85)
binarySearchTree.insert(66)
binarySearchTree.insert(95)
binarySearchTree.insert(90)
binarySearchTree.insert(100)
binarySearchTree.insert(88)
binarySearchTree.insert(93)
binarySearchTree.insert(89)

binarySearchTree.remove(85);
binarySearchTree.root.right.right.value // 88
binarySearchTree.root.right.right.right.left.left.value // 89
isBalanced
Write a function which accepts a binary search tree and returns true if the tree is balanced, otherwise returns false.

findSecondHighest
Write a function which accepts a BST and returns the second highest value.

dfsInOrder Iteratively
Write another version of the dfsInOrder function but do not use recursion. This can be challenging. Think about what the computer is doing for you when you make a recursive call.