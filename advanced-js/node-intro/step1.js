const fs = require('fs')


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
 
// cat('one.txt')

