
/*
constructNote

Write a function called constructNote, which accepts two strings, a message and some letters. The function should return true 
if the message can be built with the letters that you are given; otherwise, it should return false.

Assume that there are only lowercase letters and no space or special characters in both the message and the letters.

Constraints:

Time Complexity: O(M + N) - If M is the length of message and N is the length of letters:

Examples:

constructNote('aa', 'abc') // false
constructNote('abc', 'dcba') // true
constructNote('aabbcc', 'bcabcaddff') // true
*/

function constructNote(message, letters) {

    // create a freq map
    let freqL = new Map()


    // count each letter
    for (let l of letters ) {
        if (!freqL.has(l)) {
            freqL.set(l, 1)
        } else {
            freqL.set(l, freqL.get(l)+ 1)
        }
    }

    // decrement each letter from message
    // Return False if a key isn't found OR if we lack enough of that letter
    for (let m of message ) {
        if (!freqL.has(m)) {
            return false
        } else {
        	freqL.set(m, freqL.get(m) -1)
        }
        
   		if (freqL.get(m) < 0) {
      	return false
      }
    }

    return true

}

