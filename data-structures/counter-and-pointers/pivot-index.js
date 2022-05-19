// add whatever parameters you deem necessary

/*
Write a function called pivotIndex which accepts an array of integers, 
and returns the pivot index where the sum of the items to the left equal to the sum of the items to the right. 
If there are more than one valid pivot index, return the smallest value.

Examples:

pivotIndex([1,2,1,6,3,1]) // 3
pivotIndex([5,2,7]) // -1  no valid pivot index
pivotIndex([-1,3,-3,2]) // 1 valid pivot at 2: -1 + 3 = 2 however there is a smaller valid pivot at 1: -1 = -3 + 2
Constraints

Time Complexity: O(N)
*/

function pivotIndex(arr) {
    
    let pivotIdx = -1 // to spec if none found

    let leftSum = 0
    let rightSum = arr.reduce((a,b) => a+b, 0) // Collect all the items into a single right hand sum

    for (let i=0; i < arr.length; i++){
        leftSum += arr[i] // start a new sum from the left

        if (leftSum === rightSum) {
            pivotIdx = i;
            break   // We can't use Math.min since pivotIdx is set at -1. 
                    // Instead we return upon first index, guaranteeing it's the smallest. 
        }
        rightSum -= arr[i] // reduce our right sum by the value we just checked since it's now in the left. 

    }

    return pivotIdx

}
