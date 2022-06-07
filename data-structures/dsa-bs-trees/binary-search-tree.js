class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {

    if (this.root === null){
      this.root = new Node(val);
      return this;
    }

    let current = this.root;

    while (true) {
      if (val < current.val) {
        if(current.left === null){
          current.left = new Node(val);
          return this;
        }

       else {
        current = current.left;
        }
      } else if (val > current.val) {
        if (current.right === null) {
          current.right = new Node(val);
          return this;
        } else {
          current = current.right;
        }

      }
    }
  }



  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {

    if (this.root === null){
      this.root = new Node(val);
      return this;
    }

    if (val < current.val){
      if (current.left === null){
        current.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.left);
    }

    if (val > current.val){
      if (current.right === null){
        current.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;
    
    while(current){
      if(current.val === val){
        return current;
      }
  
      current = val < current.val ? current.left : current.right;
    }

    return undefined;

  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current=this.root) {

    if (this.root === null) return undefined;

    if (val < current.val){
      if (current.left === null) {
        return undefined;
      }
      return this.findRecursively(val, current.left);
    }

    if (val > current.val){
      if (current.right === null){
        return undefined;
      }
      return this.findRecursively(val, current.right);

    }

    return current;
  }

  

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let visited = [];


    function dfs(node){
      visited.push(node.val)
      node.left && dfs(node.left);
      node.right && dfs(node.right);
    }

    dfs(this.root);

    return visited;

  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let visited = [];

    function dfs(node){
      node.left && dfs(node.left);
      visited.push(node.val)
      node.right && dfs(node.right);
    }

    dfs(this.root)

    return visited;

  }
  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let visited = [];

    function dfs(node){
      node.left && dfs(node.left);
      node.right && dfs(node.right);
      visited.push(node.val)
    }

    dfs(this.root)

    return visited;

  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let visited = []
    let queue = []

    queue.push(this.root)

   while (queue.length){
      let current = queue.shift()
      visited.push(current.val)
      if (current.left){
        queue.push(current.left)
      }
      if (current.right){
        queue.push(current.right)
      }      
    }

    return visited

  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;
