// Maps and Sets Exercise
// Quick Question #1
// What does the following code return?

// new Set([1,1,2,2,3,4])

// [1,2,3,4]

// Quick Question #2
// What does the following code return?

// [...new Set("referee")].join("")

// [ref]

// Quick Questions #3
// What does the Map m look like after running the following code?

// let m = new Map();
// m.set([1,2,3], true);
// m.set([1,2,3], false);


// 0: {array(3) => true} // index 0 of map M contains [1,2,3] & true as a pair
// 1: {array(3) => false} // index 1 of map M contains [1,2,3] & false as a pair


// hasDuplicate
// Write a function called hasDuplicate which accepts an array and returns true or false if that array contains a duplicate

// hasDuplicate([1,3,2,1]) // true
// hasDuplicate([1,5,-1,4]) // false

//hasDupe is an array run through a function that creates a set out of the array and gets its size, if size DNE array original length then it has dupes. 
const hasDuplicate = arr => new Set(arr).size !== arr.length;

// vowelCount
// Write a function called vowelCount which accepts a string and returns a map where the keys are numbers and the values are the count of the vowels in the string.

// vowelCount('awesome') // Map { 'a' => 1, 'e' => 2, 'o' => 1 }
// vowelCount('Colt') // Map { 'o' => 1 }

//vowel checker
function isVowel(letter){
  return "aeiouAEIOU".includes(letter)
} 

function vowelCount(str){
  //create a map
  const m = new Map();
  //iterate for the char of the str
  for (let char of str){
    //check if vowel
    if (isVowel(char)){
      //check if is map
      if (m.has(char)){
        //if is in map, sey key to letter, value to count
        m.set(char, m.get(char) + 1);
      } else {
        //if is not in map, set key to letter, value to 1
        m.set(char, 1);
      }
    }
  }
  //return the map
  return m
}
