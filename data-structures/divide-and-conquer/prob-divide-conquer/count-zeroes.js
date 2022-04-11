function countZeroes(arr) {
    // This problem is trivial in python.
    // return arr.count(0)
    // A non binary search is clearer here, if slower. 
  
    let l = 0 
    let r = arr.length - 1

    while (l <= r){
        mid = Math.floor(r+l/2)

        if (arr[mid] === 1) {
            l = mid + 1
        } else if (arr[mid] === 0 ) {
            r = mid - 1
        }

    }

    return arr.length - l

}

module.exports = countZeroes