/** product: calculate the product of an array of numbers. */

function product(nums, i=0) {
  
    if (i === nums.length) return 1
   return nums[i] * product(nums, i+1)
    
}

console.log(product([2,2,2,2]))

/** longest: return the length of the longest word in an array of words. */

function longest(words, i=0, max=0) {

  if (i === words.length) return max
  return longest(words, i+1, max = Math.max(max, words[i].length))

}

console.log(longest(["a", "ab", "abc", "defg"]))

/** everyOther: return a string with every other letter. */

function everyOther(str, i=0, acc ="") {

  if (i >= str.length) return acc
  return everyOther(str, i+2, acc+=str[i])

}

console.log(everyOther("abcdefghijk"))

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, i=0) {

  let l = i
  let r = str.length - i - 1 
  if (l >= r) return true
  if (str[l] !== str[r]) return false
  return isPalindrome(str, i+1)
}

console.log(isPalindrome("racecar"))

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, i=0) {

  if (arr[i] === val) return i
  if (i === arr.length) return -1
  return findIndex(arr, val, i+1)

}

console.log(findIndex([1,2,3,4,5], 4))

/** revString: return a copy of a string, but in reverse. */

function revString(str, i=0, acc="") {

  if (acc.length===str.length) return acc
  return revString(str, i+1, acc= str[i] + acc)

}

console.log(revString("cowboy"))

/** gatherStrings: given an object, return an array of all of the string values. 
 * 
 * This isn't great to do recursively IF the object is flat and contains all strings.
 * But that fails with mixed data types or nested objects -- which is where the recursion comes in.
 * 
*/

function gatherStrings(obj) {
  // let values = []
  // for (let v of Object.values(obj)){
  //   values.push(v)
  // }
  // return values

  let result=[]
  for (let key in obj){
    if (typeof obj[key] === "string") result.push(obj[key])
    if (typeof obj[key] === "object") result.push(...gatherStrings(obj[key]))
  }

  return result

}

console.log(gatherStrings({"a": "apple", "b": "bear", "c": "candy", "d": [{ "e": {"el": "elephant"}}]}))

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, l=0, r=arr.length) {
  
  if (l > r) return -1;

  let mid = Math.floor((l+r)/2);
  if (arr[mid] === val) return mid;

  if (arr[mid] > val){
    return binarySearch(arr, val, l, mid-1);
  } else {
    return binarySearch(arr, val, mid+1, r);
  }


}

console.log(binarySearch([1,2,3,4,5,6], 1))


module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
