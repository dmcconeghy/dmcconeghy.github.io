function insertionSort(nums) {

    for (let i = 0; i < nums.length; i++){
        let current = nums[i]

        for (var j = i-1; j > -1 && nums[j] > current; j--){
            nums[j+1] = nums[j]
        }

        nums[j+1] = current
    }

    return nums
}

module.exports = insertionSort;