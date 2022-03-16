let BASEURL = "http://numbersapi.com"

let randomGen = () => { return Math.floor(Math.random()*100) }

// This is the basic route and prints a sample to console.
$.getJSON(`${BASEURL}/${randomGen()}/?json`).then(data => {
    console.log(data.text);
});

let randomNumbers = () => {
    let temp = []
    for (let i = 0; i < 4; i++){
        temp.push(randomGen())
        }
    return temp
}

// This request gets four random facts and returns them as a JSON object.
$.getJSON(`${BASEURL}/${randomNumbers()}?json`).then(data => {
    console.log(data);
  });


// This request calls four times with a different random number each time. 
// It then appends all results to the body of index.html
Promise.all(
    Array.from({ length: 4}, () => {
        return $.getJSON(`${BASEURL}/${randomGen()}/?json`);
    })
).then(facts => {
    facts.forEach(data => $("body").append(`<div><h3>A Random Number Fact:</h3><p>${data.text}</p><div>`));
})
