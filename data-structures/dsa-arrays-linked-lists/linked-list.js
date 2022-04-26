/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

   /** _get(idx): retrieve node at idx. 
    * 
    *  This helper function returns the value at a specific location. 
    *  This ensures all iteration is managed in a single location.
    *  Set the starting point
    *  Create a counter
    *  Iterate through the list until the current is null and the count isn't the idx we want
    *  Return when we find the idx value
   */

   _get(idx) {
    let current = this.head;
    let count = 0;

    while (current !== null && count != idx) {
      count += 1;
      current = current.next;
    }

    return current;
  }



  /** push(val): add new value to end of list. 
   * 
   * Create a newNode. 
   * if our list has no head (ie, it's empty)
   * set out newNode as the list's head
   * Set the tail to our newNode (list of 1 means head = tail)
   * 
   * if our list has a head (ie, at least one item)
   * set our newNode to be the next of the previous tail
   * set our newNode to be the tail
   * It's important to do these in that order. 
   * 
   * Update the list's length
  */

  push(val) {
    let newNode = new Node(val)

    if(!this.head){
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length +=1;

  }

  /** unshift(val): add new value to start of list. 
   * 
   * Create a newNode
   * if the list is empty or doesn't have a head
   * Set the newNode to the head & tail
   * 
   * If the list has a head
   * set the newNode's next to be the current head
   * set the head to be the newNode
   * It's important to do these in this order
   * 
   * Sample code's if clause is (this.head == null). Not sure why yet
   * 
  */

  unshift(val) {
    let newNode = new Node(val)

    if(!this.head){
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length += 1;

  }

  /** pop(): return & remove last item. 
   * 
   * Since we have the list's length, we can remove it by index.
   * RemoveAt() handles updating head/tail/next
   * Our removeAt() returns the item removed by default
  */

  pop() {
    if (this.length === 0) {
      throw new Error("Can't pop an item from an empty list");
    }

    return this.removeAt(this.length -1);

  }

  /** shift(): return & remove first item. 
   * 
   * Since we have the list's length, we remove it by index
   * RemoveAt() handles updating head/tail/next
   * Our removeAt returns the removed item by default
  */

  shift() {

    if (this.length === 0) {
      throw new Error("Can't shift an item from an empty list");
    }

    return this.removeAt(0);


  }

  /** getAt(idx): get val at idx. 
   * 
   * Throw an error if out of bounds
   * 
   * Return using our index
   * 
  */

  getAt(idx) {

    if (idx >= this.length || idx < 0){
      throw new Error("Invalid index");
    }

    return this._get(idx).val;


  }

  /** setAt(idx, val): set val at idx to val 
   * 
   * Throw an error if out of bounds
   * 
   * Get the node at the idx. Update its value
   * 
  */

  setAt(idx, val) {
    if (idx >= this.length || idx < 0){
      throw new Error("Invalid index")
    }

    let current = this._get(idx);
    current.val = val;

  }

  /** insertAt(idx, val): add node w/val before idx. 
   * 
   * Case 1: we could be dealing with an empty list
   * Case 2: we could be modifying the last item in the last
   * Case 3: Our node is somewhere in the middle, 
   *         So we'll need to update the previous node's next to our new node's value
   *         And also update our new node's next to the previous node's next 
   * 
  */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0 ){
      throw new Error("Invalid index")
    }

    if (idx === 0) return this.unshift(val);

    if (idx === this.length) return this.push(val);

    let previous = this._get(idx - 1);

    let newNode = new Node(val);
    newNode.next = previous.next;
    previous.next = newNode;

    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, 
   * 
   * case 1: we could receive a bad index
   *    if so throw an error
   * 
   * case 2: we could be removing the last item
   *    We need to save the val to return it
   *    if so then we'll need to update the previous node 
   *    It will become the new tail and its next will be null
   *    
   * case 3: we could be removing the first item
   *    if so then we'll need to update the former head's next to be the new head
   *    The new head's next remains the same
   *    If the length of the list is short (<2) then we'll need to update the tail
   * 
   * cast 4: we could be removing an item in the middle
   *    if so then we'll need to update the item's idx - 1's next to be the idx+1
   *    
   * Finally, update the length
   * 
  */

  removeAt(idx) {

    if (idx >= this.length || idx < 0){
      throw new Error("Invalid index");
    }
    
    // Is it the first item?
    if (idx === 0){
      let val = this.head.val;
      this.head = this.head.next;
      this.length -=1;
      if (this.length < 2) this.tail = this.head;
      return val;
    }

    let previous = this._get(idx -1);

     // Is it the tail?
    if (idx === this.length - 1){
      let val = this.getAt(idx);
      previous.next = null;
      this.tail = previous;
      this.length -=1;
      return val;
    }

    
    // Is it in the middle?
    let val = this.getAt(idx);
    previous.next = previous.next.next;
    this.length -= 1
    return val
  }

  /** average(): return an average of all values in the list 
   * 
   * Sum of a 0 item list is 0
   * 
   * Otherwise iterate through the list, accumulating values
   * Start with the head and use each next to set move the chain
   * return the accumulator / number of items
   * 
   * 
  */

  average() {

    if (this.length === 0) return 0;

    let sum = 0;
    let current = this.head;

    while (current){
      sum += current.val;
      current = current.next;
    }

    return sum / this.length

    
  }
}

module.exports = LinkedList;
