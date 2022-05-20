Notes on questions from [Toptal](https://www.toptal.com/javascript/interview-questions]

1. Since nearly everything is an object in javascript, if bar is === null then it will return true even through it's not the kind of object you were checking for. A better solution is to use instanceof.
2. Just another excuse to NOT use var and to avoid chaining variables. Also note that chained variables should be extracted r to l. Also convincing evidence to use strict mode to avoid this nonsense. 
3. Another scope issue. The internal this is undefined because it exists inside another function and thus hasn't been set yet. 
4. Encapsulation. private methods with public access made by closure. 
5. Because it's awesome? But seriously, it prevents all kinds of errors from undeclareds getting hoisted to globals to this coercion. 
6. foo2 will return undefined. the \n means the linter will add ; excluding the block from being returned. 
7. This is a floating point issue. Beware decimals. Use truncation or fancy EPSILON maths.
8. 1, 4, 3, 2
9. This example's 3rd item is wrong if we're going strictly by characters, which is why they have to use the replace for spaces and commas. So that item isn't the same forward and backward because it has lost the strings and spaces and their locations. But yes, in JS we best use split.reverse.join after normalizing the characters.  
10. args to the rescue. arguments is iterable and has a length. But, uh, don't do this with your functions. 
11. 5. Loop ends before we can access anything. Also, quit using var. Self note: (Bonus points for the interviewee if they know enough to talk about how execution contexts, variable objects, activation objects, and the internal “scope” property contribute to the closure behavior.)
12. Not sure I understand this answer. Both are set to undefined? 
13. The reverse method is destructive so line 2 changes both arr1 and sets arr2 by reference. Push doesn't concat, it adds an entry. 
14. 122, 32, 02, 112, NaN2, NaN
15. That's a neat trick. Passing the call to the event loop rather than the call stack to avoid overflow. 
16. closure is inner function's access to outer function or globally scoped variables. 
17. || returns first from l to r if true. so 1 and 1. && has to evaluate both and returns the first failure if any or the last. So 0, 2
18. == is coercive and chances '0' to 0 which is falsy. === does not. 
19. Oh. That's terrible. Stringify is dangerous.
20. This wouldn't be hard if it weren't all one line. Plus, who gives their functions a one character name!?
21. Another nested function with mutltiple anonymous calls. These all seem like bad ideas. What proper use case is there for this?
22. object properties aren't globally scoped unless you bind them. 
23. a recursive DFS traversal. This is a weird ask in the middle of this JS tricks list. 
24. This question is silly. 10 is obvious. Second part has little relation. Should have a third ask about this.length
25. Var scoping strikes again. 
26. local var overrides global, but internally presence of duplicate variable names get registered even before they're initialized. 
27. It's a normal loop. 
28. Interesting. And a caution to avoid chaining less/greater than operators in evaluative statements. 
29.  unshift/push or spread it. 
30.  No crash. undefined
31.  Null itself is undefined? 
32.  string
33.  5 5 times
34.  NaN is a number. Number.isNan()
35.  3
36.  %, Number.isInteger(). Interesting other mathy solutions x^0, rounding
37.  structuredClone! So new they didn't even add it here. Don't use object.assign() if you have nested objects. 