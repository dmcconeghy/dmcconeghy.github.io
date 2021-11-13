function filterOutOdds() {
    var nums = Array.prototype.slice.call(arguments);
    return nums.filter(function(num) {
      return num % 2 === 0
    });
  }

function filterOutOddsArrow(...nums){
    return nums.filter((num) => {return num % 2 === 0})
}

function findMin(...args) {
    return args.reduce((a, b) => a < b ? a : b)
}

function mergeObjects (obj1, obj2) {
    return ({...obj1, ...obj2})
}

function doubleAndReturnArgs(arr, ...args){
    return [...arr, ...args].map( (val) => val*2)
}

/** remove a random element in the items array
and return a new array without that item. */

const removeRandom = items => {
  let idx = Math.floor(Math.random() * items.length);
  return [...items.slice(0, idx), ...items.slice(idx + 1)];
}

/** Return a new array with every item in array1 and array2. */

const extend = (array1, array2) => {
  return [...array1, ...array2];
}

/** Return a new object with all the keys and values
from obj and a new key/value pair */

const addKeyVal = (obj, key, val) => {

  // OPTION 1
  let newObj = { ...obj }
  newObj[key] = val;
  return newObj;

  // OPTION 2 (uses an object enhancement you'll see in the next unit)
  // return { ...obj, [key]: val };
}

/** Return a new object with a key removed. */

const removeKey = (obj, key) => {

  // OPTION 1
  let newObj = { ...obj }
  delete newObj[key]
  return newObj;

  // OPTION 2 (uses an object enhancement you'll see in the next unit)
  // ({ [key]: undefined, ...obj } = obj);
  // return obj;
}

/** Combine two objects and return a new object. */

const combine = (obj1, obj2) => {
  return { ...obj1, ...obj2 };
}

/** Return a new object with a modified key and value. */

const update = (obj, key, val) => {

  // OPTION 1

  let newObj = { ...obj }
  newObj[key] = val;
  return newObj;

  // OPTION 2 this uses an object enhancement you'll see in the next unit)
  // return { ...obj, [key]: val };
}

/** remove a random element in the items array
and return a new array without that item. */

function removeRandom(items) {
    const randomIndex = Math.floor(Math.random()*items.length);

    return[...items.slice(0, randomIndex), ...items.slick(randomIndex+1)] 

}

/** Return a new array with every item in array1 and array2. */

function extend(array1, array2) {
    return [...array1, ...array2];

}

/** Return a new object with all the keys and values
from obj and a new key/value pair */

function addKeyVal(obj, key, val) {

    return {...obj, [key]: val};

}


/** Return a new object with a key removed. */

function removeKey(obj, key) {

    let newObject = {...obj};
    delete newObject[key];
    return newObject;

}


/** Combine two objects and return a new object. */

function combine(obj1, obj2) {

    return {...obj1, ...obj2};

}


/** Return a new object with a modified key and value. */

function update(obj, key, val) {

    let newObject = {...obj};
    newObject[key] = val;
    return newObject;

}