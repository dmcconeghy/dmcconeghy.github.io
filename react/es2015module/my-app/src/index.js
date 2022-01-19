import {choice, remove } from "./helpers"
import fruits from "./foods"

let selection = choice(fruits);

console.log(`I'd like one ${selection}, please`);
console.log(`Here you go: One ${selection}`);
console.log("Delicious! May I have another?")
remove(fruits, selection);
console.log(`Sorry! We're all out of ${selection}, but we have ${fruits.length} other fruits left.`)

