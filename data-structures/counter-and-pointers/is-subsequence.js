// add whatever parameters you deem necessary
/*
isSubsequence
Write a function called isSubsequence which takes in two strings and 
checks whether the characters in the first string form a subsequence of the 
characters in the second string. In other words, the function should check whether 
the characters in the first string appear somewhere in the second string, without their order changing.

Examples:

isSubsequence('hello', 'hello world'); // true
isSubsequence('sing', 'sting'); // true
isSubsequence('abc', 'abracadabra'); // true
isSubsequence('abc', 'acb'); // false (order matters)
Constraints:

Time Complexity - O(N + M)
*/
function isSubsequence(s, t) {

    for (let i=0; i < s.length; i++){
        for (let j=0; j < t.length; j++){
            if (s[i] === t[j]){
                i++
            }
            
            if (j+1 == t.length && i !== s.length) {
            return false
        	}
        }  
    }
        
    return true

}
