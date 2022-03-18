const fs = require('fs')
const axios = require('axios')
const process = require("process");


function cat(path){

    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error("Encountered an error:", err)
            process.exit(1)
        } else {

            console.log(`File contents: ${data}`)
        }
    })
    

    }

async function webCat(URL) {
   
    try {
        let response = await axios.get(URL)
        console.log(response.data)
    } catch (err) {
        console.err(`Cannot read URL:' ${URL}: ${err}`)
        process.exit(1)
    }
   
    
}


// webCat('http://www.linfo.org/cat.html')
// cat('one.txt')

let path = process.argv[2]

if (path.slice(0, 4) === "http") {
    webCat(path)
    
} else {
    cat(path)
} 