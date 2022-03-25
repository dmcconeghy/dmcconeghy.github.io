const express = require("express");
const app = express();
const itemRoutes = require("./routes");
const ExpressError = require("./expressError");

app.use(express.json());
app.use("/items", itemRoutes);


// 404 handler
app.use(function(req, res, next) {
    return new ExpressError("Not Found", 404);
});


// generic error handler
app.use(function (err, req, res, next) {
    // the default status is 500 Internal Server Error
    res.status(err.status || 500);
  
    
    return res.json({
      error: err.message 
    });
});

module.exports = app;