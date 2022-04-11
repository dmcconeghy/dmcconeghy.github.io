function findFloor(arr, x) {
// Write a function called findFloor which accepts a sorted array and a value x, and returns the floor of x in the array. 
// The floor of x in an array is the largest element in the array which is smaller than or equal to x. 
// If the floor does not exist, return -1.

let l = 0
let r = arr.length - 1

if (x < arr[0]){
    return -1
} else if (x > arr[r]){
    return arr[r]
}

while (l < r){
    mid = Math.floor(r+l/2)
            
    if (arr[mid] <= x && arr[mid+1] > x){
        return arr[mid]
      
    } else if (arr[mid] < x ){
        l = mid + 1
        
    } else {
       r = mid - 1
    }

}
}

module.exports = findFloor