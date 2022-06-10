function bubbleSort(nums) {
    /*
        look at nums[0], nums[1]
        if nums[0] > nums[1] swap them
        increase index 
        look at nums[1], [2]
        
        if nums[1] <= nums[2]
        increase index

        when idx = lastIdx
        start over; decrement lastIdx. 
    */

    
    
    for (let i = nums.length; i > 0; i--){

        for (let j = 0; j < i-1; j++){

            if (nums[j] > nums[j + 1]){

                [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
            } 
        }
        
    }
    return nums
}


module.exports = bubbleSort;