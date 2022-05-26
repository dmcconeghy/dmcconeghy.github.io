/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {

    if (!this.root) return 0;

    function getMin(node){

        if (node.left === null && node.right === null) return 1;
        if (node.left === null) return getMin(node.right) + 1;
        if (node.right === null) return getMin(node.left) + 1;

        return (Math.min(getMin(node.left), getMin(node.right)) + 1)
      
    }

    return getMin(this.root)

  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {

    if (!this.root) return 0;

    function getMax(node){

        if (node.left === null && node.right === null) return 1;
        if (node.left === null) return getMax(node.right) + 1;
        if (node.right === null) return getMax(node.left) + 1;

        return (Math.max(getMax(node.left), getMax(node.right)) + 1)
      
    }

    return getMax(this.root)

  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {

    let result = 0;

    function dfs(node){
      
      if (node === null) return 0;
      
      // go down to left-most left. Then back up picking the larger branch's sum
      let left = dfs(node.left)
      // then go right
      let right = dfs(node.right)
      // sum the two leaves/branches at a given node and pick the larger. 
      result = (Math.max(result, node.val + left + right))

      // return the larger of 0, the left branch+the node or the right branch+node
      return Math.max(0, left+node.val, right + node.val)

    }

    dfs(this.root)
    return result;

  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    let q = [this.root]
    let min = null;

   while (q.length){
     let currNode = q.shift()
     let currVal = currNode.val
     let higher = currVal > lowerBound 
     let closest = currVal < min || min === null;

     if (higher && closest){
      min = currVal
     }
     if (currNode.left) q.push(currNode.left)
     if (currNode.right) q.push(currNode.right)
     
   }

   return min

  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    let arr=[]

    const dfs = (node) => {
      if (node){
        arr.push(node.val)
        dfs(node.left, arr)
        dfs(node.right, arr)
      } else {
        arr.push("#")
      }
    }

    dfs(tree.root)
    let final = arr.join(" ")
    
    return final
    
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    if (!stringTree) return null;

    const values = stringTree.split(" ");

    function buildTree() {
      if (values.length) {
        const currVal = values.shift();

        if (currVal === "#") return null;

        let currNode = new BinaryTreeNode(+currVal);
        currNode.left = buildTree();
        currNode.right = buildTree();
        
        return currNode;
      }
    }

    const root = buildTree();
    return new BinaryTree(root);

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2, currentNode=this.root) {

    // let curr = this.root
    // while (curr){
    //   if (node1.val > curr.val && node2.val > curr.val){
    //     curr = curr.right
    //   } else if (node1.val < curr.val && node2.val < curr.val){
    //     curr = curr.left
    //   } else {
    //     // console.log(curr)
    //     return curr
    //   }
    // }

    if (currentNode === null) return null;

    if (currentNode === node1 || currentNode === node2) return currentNode;

    const left = this.lowestCommonAncestor(node1, node2, currentNode.left);
    const right = this.lowestCommonAncestor(node1, node2, currentNode.right);

    if (left !=null && right !== null) return currentNode;

    if (left !==null || right !== null) return left || right

    if (left === null && right === null) return null
    
  }
}

emptyTree = new BinaryTree();

  // build small tree;
  let smallLeft = new BinaryTreeNode(5);
  let smallRight = new BinaryTreeNode(5);
  let smallRoot = new BinaryTreeNode(6, smallLeft, smallRight);
  smallTree = new BinaryTree(smallRoot);

  // build large tree
  let node6 = new BinaryTreeNode(1);
  let node5 = new BinaryTreeNode(1);
  let node4 = new BinaryTreeNode(2);
  let node3 = new BinaryTreeNode(3, node4, node6);
  let node2 = new BinaryTreeNode(5, node3, node5);
  let node1 = new BinaryTreeNode(5);
  let root = new BinaryTreeNode(6, node1, node2);
  largeTree = new BinaryTree(root);

  // console.log(smallTree.minDepth())
  // console.log(largeTree.minDepth())
  // console.log(smallTree.maxDepth())
  // console.log(largeTree.maxSum())
  // console.log(smallTree.maxSum())
  // console.log(largeTree.nextLarger(1))
  // console.log(smallTree.nextLarger(1))
  // console.log(BinaryTree.serialize(largeTree))
  // console.log(BinaryTree.serialize(smallTree))
  // console.log(largeTree.lowestCommonAncestor(3,5))
  // console.log(smallTree.lowestCommonAncestor(6,5))

module.exports = { BinaryTree, BinaryTreeNode };
