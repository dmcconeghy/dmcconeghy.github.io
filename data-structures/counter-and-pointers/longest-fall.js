// add whatever parameters you deem necessary

/*
Write a function called longestFall, which accepts an array of integers, 
and returns the length of the longest consecutive decrease of integers.

Examples:

longestFall([5, 3, 1, 3, 0]) // 3, 5-3-1 is the longest consecutive sequence of decreasing integers
longestFall([2, 2, 1]) // 2, 2-1 is the longest consecutive sequence of decreasing integers
longestFall([2, 2, 2]) // 1, 2 is the longest consecutive sequence of decreasing integers
longestFall([5, 4, 4, 4, 3, 2]) // 3, 4-3-2 is the longest
longestFall([9, 8, 7, 6, 5, 6, 4, 2, 1]) // 5, 9-8-7-6-5 is the longest
longestFall([]) // 0
*/

function longestFall(arr) {
    let left = 0
    let right = 1
    let maxSequence = 1 // ensures singles count as decreasing
    
    if (arr.length === 0) return 0 // special case for empty arrays

    while (right < arr.length){
				
        
        if (arr[left] > arr[right]) {  
            maxSequence = (right-left + 1) // offset for 0-index
            
        } else if (arr[left] === arr[right]){
        	left = right
          maxSequence = Math.max(1, maxSequence) // special case for ties 
        } 
           
        if (arr[right] <= arr[right+1]) {
            left = right
            
        }
        
        right++
    }
		
    return maxSequence

}
