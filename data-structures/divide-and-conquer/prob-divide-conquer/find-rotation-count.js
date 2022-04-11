function findRotationCount(arr, l = 0, r = arr.length - 1) {
    if (r < l) return 0;
    if (r === l) return l;
    let mid = Math.floor((l + r) / 2)
  
   
    if (mid < r && arr[mid + 1] < arr[mid]) {
      return mid + 1;
    }
    
    if (mid > l && arr[mid] < arr[mid - 1]) {
      return mid;
    }
  
    
    if (arr[r] > arr[mid]) {
      return findRotationCount(arr, l, mid - 1);
    } else {
  
    return findRotationCount(arr, mid + 1, r);
  }
}
// findRotationCount
// Write a function called findRotationCount which accepts an array of distinct numbers sorted in increasing order. 
// The array has been rotated counter-clockwise n number of times. 
// Given such an array, find the value of n.

// Constraints:

// Time Complexity: O(log N)

// Examples:

// findRotationCount([15, 18, 2, 3, 6, 12]) // 2
// findRotationCount([7, 9, 11, 12, 5]) // 4
// findRotationCount([7, 9, 11, 12, 15]) // 0







module.exports = findRotationCount