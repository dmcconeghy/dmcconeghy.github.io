const fs = require('fs')
const axios = require('axios')
const process = require("process");


function cat(path, output){
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(`Encountered an error with: ${path}, ${err}`)
            process.exit(1)
        } else {
            writeOutput(data, output)
        }
    })
}

async function webCat(URL, output) { 
    try {
        let response = await axios.get(URL)
       writeOutput(response.data, output)
        
    } catch (err) {
        console.err(`Cannot read URL:' ${URL}: ${err}`)
        process.exit(1)
    } 
}

function writeOutput(text, output) {
    if (output) {
        fs.writeFile(output, text, "utf-8", function(err) {
            if(err){
                console.err(`Error has occured writing to ${output}: ${err}`)
                process.exit(1)
            } 
        })
    } else {
        console.log(text)
    }
   
}


// webCat('http://www.linfo.org/cat.html')
// cat('one.txt')

let path
let output

if (process.argv[2] === '--out') {
    output = process.argv[3]
    path = process.argv[4]
} else {
    path = process.argv[2]
}

if (path.slice(0, 4) === "http") {
    webCat(path, output)
} else {
    cat(path, output)
} 
