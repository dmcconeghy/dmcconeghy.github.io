/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    // empty
    if (!this.root) return 0;

    // accumulator
    let sum = this.root.val;

    function sigma(node){
      // for each child of node's children since this is n-ary tree
      for (let child of node.children){
        // accumulate
        sum += child.val;

        // if the child has children, recurse with each child and its children... 
        if (child.children.length > 0) {
          sigma(child);
        }
      }
    }

    // start with root
    sigma(this.root);
    return sum;

  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {

    if (!this.root) return 0;

    let count = 0;

    if (this.root.val % 2 === 0){
      count++  
    }

    function counter(node){

      for (let child of node.children){

        if (child.val % 2 === 0) count++;

        if (child.children.length > 0){
          counter(child);
        }
      }
    }
    
    counter(this.root);
    return count;

  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {

    if (!this.root) return 0;

    let count = 0

    if (this.root.val > lowerBound){
      count++;
    }

    function counter(node){

      for (let child of node.children){
        if (child.val > lowerBound) count++;

        if (child.children.length > 0){
          counter(child);
        }
      }
    }

    counter(this.root);
    return count;

  }
}

emptyTree = new Tree();

  // build small tree
  let nSmall = new TreeNode(1);
  let nSmall2 = new TreeNode(2);
  nSmall.children.push(nSmall2);
  smallTree = new Tree(nSmall);

  // build large tree
  let n = new TreeNode(1);
  let n2 = new TreeNode(2);
  let n3 = new TreeNode(3);
  let n4 = new TreeNode(4);
  let n5 = new TreeNode(5);
  let n6 = new TreeNode(6);
  let n7 = new TreeNode(7);
  let n8 = new TreeNode(8);

  n.children = [n2, n3, n4];

  n4.children.push(n5, n6);
  n6.children.push(n7);
  n7.children.push(n8);

  largeTree = new Tree(n);

  // console.log(smallTree.sumValues())
  // console.log(largeTree.sumValues())
  // console.log(smallTree.countEvens())
  // console.log(largeTree.countEvens())
  // console.log(smallTree.numGreater(0))
  // console.log(largeTree.numGreater(5))
module.exports = { Tree, TreeNode };
