function selectionSort(nums) {

    for (let i = 0; i < nums.length; i++){
        // our left pointer moves one slot at a time as the sorted left increases in size
        let lastSortedIdx = i;

        for (let j = i+1; j < nums.length; j++){
            // is our last sorted item greater than the new one? 
            // if not set our last sorted index to the index of the greater one.
            
            if (nums[lastSortedIdx] > nums[j]){
                lastSortedIdx = j;
            }
        }

        // If our sorted end index isn't i then swap them. 
        if (i !== lastSortedIdx) {
            [nums[i], nums[lastSortedIdx]] = [nums[lastSortedIdx], nums[i]]

        }
      
        
    }
    
    console.log(nums)
    return nums;

}

module.exports = selectionSort;