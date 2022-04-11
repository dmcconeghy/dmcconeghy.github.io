function findRotatedIndex(nums, x) {

    let l = 0
    let r = nums.length -1
    
    while (l <= r){
        let mid = Math.floor(r+l/2)

        if (nums[mid] === x){
            return mid
        }

        // check left
        if (nums[l] <= nums[mid]) {
            if (nums[l] <= x && x <= nums[mid]){
                // x is in l
                r = mid - 1
                // x is in r
            } else {
                l = mid + 1
            }
        // must be right 
        } else {
            if (nums[mid] <= x && x <= nums[r]){
                // x is r
                l = mid + 1
            } else {
                r = mid -1
            }


    }
}
    // all failed
    return -1
}



// Write a function called findRotatedIndex which accepts a rotated array of sorted numbers and an integer. 
// The function should return the index of num in the array. If the value is not found, return -1.

// Constraints:

// Time Complexity: O(log N)

// Examples:

// findRotatedIndex([3,4,1,2],4) // 1
// findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8) // 2
// findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3) // 6
// findRotatedIndex([37,44,66,102,10,22],14) // -1
// findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12) // -1
module.exports = findRotatedIndex