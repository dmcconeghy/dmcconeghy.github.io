// add whatever parameters you deem necessary
/*
    Write a function called sameFrequency. Given two positive integers, find out if the two numbers have the same frequency of digits.

    Examples:

    sameFrequency(182,281) // true
    sameFrequency(34,14) // false
    sameFrequency(3589578, 5879385) // true
    sameFrequency(22,222) // false
    Constraints

    Time Complexity - O(N + M)
*/
function sameFrequency(x, y) {

    let freqM = new Map()

    if (x.length !== y.length) {
        return false
    }

    for (let num of x.toString()){
        if (!freqM.has(num)){
            freqM.set(num, 1)
        } else {
            freqM.set(num, freqM.get(num) + 1)
        }
    }

    for (let num of y.toString()){
        if (!freqM.has(num)){
            return false
        }

        if (freqM.has(num)){
            freqM.set(num, freqM.get(num) -1)
        }

        if (freqM.get(num) < 0){
            return false
        }
    }

    return true

}
