const express = require('express')
const math = require('mathjs')
const ExpressError = require('./expressError')

const app = express()

function validateNums(array){
    for (let i=0; i < array.length; i++){
        let check = Number(array[i])

        if (Number.isNaN(check)){
            return false
        }
    }

    return true
}


app.get('/mean', function(req, res, next) {
    
    if(!req.query.nums){
        throw new ExpressError('Invalid! Empty query string', 400)
    }
   
    let numberString = req.query.nums.split(',')

    if (validateNums(numberString)){

        let mean = math.mean(numberString)
       
        let response = {
            operation: 'mean',
            value: mean
        } 
        return res.send(response)
        
    } else {

        throw new ExpressError("Entries must be numbers", 400)
    }

});

app.get('/median', function(req, res) {
    if(!req.query.nums){
        throw new ExpressError('Invalid! Empty query string', 400)
    }

    let numberString = req.query.nums.split(',')

    if (validateNums(numberString)){

        let median = math.median(numberString)

        let response = {
            operation: 'median',
            value: median
        } 
        return res.send(response)
        
    } else {

        throw new ExpressError("Entries must be numbers", 400)
    }
    
});

app.get('/mode', function(req, res) {
    if(!req.query.nums){
        throw new ExpressError('Invalid! Empty query string', 400)
    }

    let numberString = req.query.nums.split(',')

    if (validateNums(numberString)){

        let mode = math.mode(numberString)

        let response = {
            operation: 'mode',
            value: parseInt(mode)
        } 
        return res.send(response)
        
    } else {

        throw new ExpressError("Entries must be numbers", 400)
    }

});

app.get('/all', function(req, res) {
    if(!req.query.nums){
        throw new ExpressError('Invalid! Empty query string', 400)
    }

    let numberString = req.query.nums.split(',')

    if (validateNums(numberString)){

        let mode = math.mode(numberString)
        let median = math.median(numberString)
        let mean = math.mean(numberString)

        let response = {
            operation: 'all',
            value: parseInt(mode),
            median: median,
            mean: mean
        } 
        return res.send(response)
        
    } else {

        throw new ExpressError("Entries must be numbers", 400)
    }

});


app.use(function(req, res, next) {
    const e = new ExpressError("Not Found", 404)
    return next(e)
})

app.use(function(e, req, res, next) {
    res.status(e.status || 500);

    return res.json({
        error: e,
        message: e.message
    })
})

app.listen(3000, function() {
    console.log('App listening on port 3000')
})