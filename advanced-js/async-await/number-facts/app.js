let BASEURL = "http://numbersapi.com"

let randomGen = () => { return Math.floor(Math.random()*100) }

// This is the basic route and prints a sample to console.
async function randomNumberFact () {
    return await $.getJSON(`${BASEURL}/${randomGen()}/?json`).then(data => {
        console.log(data.text);
    });
}

randomNumberFact()


let randomNumbers = () => {
    let temp = []
    for (let i = 0; i < 4; i++){
        temp.push(randomGen())
        }
    return temp
}

// This request gets four random facts and returns them as a JSON object.
async function fourRandomNumberFacts () {
 return await $.getJSON(`${BASEURL}/${randomNumbers()}?json`).then(data => {
    console.log(data);
  });
}

fourRandomNumberFacts()


// This request calls four times with a different random number each time. 
// It then appends all results to the body of index.html

async function printFourFacts() {
    let fourFacts = await Promise.all(
        Array.from({ length: 4}, () => {
            return $.getJSON(`${BASEURL}/${randomGen()}/?json`);
        })
    );

    fourFacts.forEach(data => {
        $("body").append(`<div><h3>A Random Number Fact:</h3><p>${data.text}</p><div>`)
    })
}  
    
printFourFacts()
