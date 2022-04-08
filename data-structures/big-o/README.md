# Big-O Notation Practice

## Step One: Simplifying Expressions

1. O(n + 10) = O(n) extra 10 is insignificant
2. O(100 * n) = O(n) extra *100 is still insignificant with large N
3. O(25) = O(1) 25 is constant
4. O(n^2 + n^3) = O(n^3) but O(n^2) expresses the same
5. O(n + n + n + n) = O(n) 4*n is insignificant
6. O(1000 * log(n) + n) = O(n). n is dominant as linear max. 1000*log(n) is insignificant  
7. O(1000 * n * log(n) + n) = O(n log n) 1000 is insignificant, as is +n in face of n * log (n) 
8. O(2^n + n^2) = O(2^n) n^2 is insignificant when compared to ^n
9. O(5 + 3 + 1) = O(1) 9 is constant
10. O(n + n^(1/2) + n^2 + n * log(n)^10) = O(n^2) is the dominant term. All others ignored.

## Step Two: Calculating Time Complexity

`function logUpTo(n) {
  for (let i = 1; i <= n; i++) {
    console.log(i);
  }
}`

- logUpTo(n) has a time complexity of O(n)

`function logAtLeast10(n) {
  for (let i = 1; i <= Math.max(n, 10); i++) {
    console.log(i);
  }
}`

- logAtLeast10(n) has a time complexity of O(n)

`function logAtMost10(n) {
  for (let i = 1; i <= Math.min(n, 10); i++) {
    console.log(i);
  }
}`

- logAtMost10(n) has a time complexity of O(1)

`function onlyElementsAtEvenIndex(array) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (i % 2 === 0) {
      newArray.push(array[i]);
    }
  }
  return newArray;
}`

- onlyElementsAtEvenIndex(array) has a time complexity of O(array) = O(n)

`function subtotals(array) {
  let subtotalArray = [];
  for (let i = 0; i < array.length; i++) {
    let subtotal = 0;
    for (let j = 0; j <= i; j++) {
      subtotal += array[j];
    }
    subtotalArray.push(subtotal);
  }
  return subtotalArray;
}`

- subtotals(array) has a time complexity of O(array.length^2) or O(n^2)

`function vowelCount(str) {
  let vowelCount = {};
  const vowels = "aeiouAEIOU";

  for (let char of str) {
    if(vowels.includes(char)) {
      if(char in vowelCount) {
        vowelCount[char] += 1;
      } else {
        vowelCount[char] = 1;
      }
    }
  }

  return vowelCount;
}`

- vowelCount(str) has a time complexity of O(n)

## Part 3 - short answer

1. True or false: n^2 + n is O(n^2). True. +n is insignificant
2. True or false: n^2 * n is O(n^3). True 
3. True or false: n^2 + n is O(n). False. It's O(n^2)
4. What’s the time complexity of the .indexOf array method?
   - O(n) Could have to iterate to final item
5. What’s the time complexity of the .includes array method?
   - O(n) Could have to iterate to final item
6. What’s the time complexity of the .forEach array method?
    - O(n) at minimum. Depends on what you do on each item.
7. What’s the time complexity of the .sort array method?
    - O(n) to O(n log n) or O(n^2) depending on browser's use of Timsort or Quick sort. 
8. What’s the time complexity of the .unshift array method?
    - Unshift adds at 0 index, shifting all items. O(n)
9.  What’s the time complexity of the .push array method?
    - Push adds at array's end, so O(1)    
10. What’s the time complexity of the .splice array method?
    - Splice removes elements, potentially shifting all items to the right. O(n)
11.  What’s the time complexity of the .pop array method?
    - Pop returns last element. O(1)
12.  What’s the time complexity of the Object.keys() function?
    - key() returns all keys. O(n)
13.  What’s the space complexity of the Object.keys() function?
    - O(n) 