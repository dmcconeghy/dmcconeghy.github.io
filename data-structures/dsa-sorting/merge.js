function merge(arr1, arr2) {
    arr3 = [];
    let p1 = 0;
    let p2 = 0;

    while (p1 < arr1.length && p2 < arr2.length){
        if (arr1[p1] <= arr2[p2]){
            arr3.push(arr1[p1]);
            
            p1++;
        } else {
            arr3.push(arr2[p2])
            
            p2++;
        }
    }

    while(p1 < arr1.length) {
            
        arr3.push(arr1[p1]);
        p1++
            
        }
    
    while(p2 < arr2.length){
        arr3.push(arr2[p2]);
        p2++
    }
        
    
    return arr3

}

function mergeSort(nums) {

    // base case
    if (nums.length <=1) return nums;

    // find the mid, split it left and right
    // we'll go all the way down left until there's only 1 or fewer items in the nums we pass in. 
    // Then all the way right 
    // Then we'll merge those starting with the smallest
    // Returning when we empty the call stack. 

    const mid = Math.floor(nums.length / 2);
    const left = mergeSort(nums.slice(0, mid));
    const right = mergeSort(nums.slice(mid));

    return merge(left, right)

    /*
        // This iterative solution has a bug or two.
        // Abandoned for more obvious recursive solution. 
        // split the nums array's elements into individual array
        // Ideally this would be two-element arrays
        for (let i = 0; i < nums.length; i++){
            nums[i] = [i]
        }
        // until there's just one array inside nums
        // merge the last two
        // replace the next to last with the merge
        // pop the last. 
        
        while (nums.length > 1){
            let merged = merge(nums[nums.length -1], nums[nums.length-2])
            nums[nums.length-2] = merged
            console.log(nums)
        
            nums.pop()
        }

        // THis runs into an error with the final two merges. 
        // When the array goes to two the merge() will have a boundary error
        merge(nums[0], nums[1])
        console.log(nums)
        return [...nums]
    */
}

module.exports = { merge, mergeSort};