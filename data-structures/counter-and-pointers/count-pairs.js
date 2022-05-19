// add whatever parameters you deem necessary
/*
Given an array of integers, and a number, 
find the number of pairs of integers in the array whose sum is equal to the second parameter. 
You can assume that there will be no duplicate values in the array.

Examples:

countPairs([3,1,5,4,2], 6) // 2 (1,5 and 2,4)
countPairs([10,4,8,2,6,0], 10) // 3 (2,8, 4,6, 10,0)
countPairs([4,6,2,7], 10) // 1 (4,6)
countPairs([1,2,3,4,5], 10) // 0
countPairs([1,2,3,4,5], -3) // 0
countPairs([0,-4],-4) // 1
countPairs([1,2,3,0,-1,-2],0) // 2
Constraints

Time Complexity - O(N * log(N))
A sorted array(O(N)) could use binary search (O(log(N)). 

or

Time Complexity - O(N)

*/
function countPairs(arr, num) {
    // Set works here because of problem constraints -- no dupes
    let targets = new Set(arr)
    let resultsCount = 0

    // O(N) because we iterate once.
    // Deleting the val works because of problem contraints -- no dupes
    // Thus each val has only one mate and can't be itself. 
    for (let val of arr){
        targets.delete(val)
        if (targets.has(num-val)){
            resultsCount++
        }
    }
        
    return resultsCount
}



