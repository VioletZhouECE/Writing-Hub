const {ValidationError} = require('express-validation')

//error handler used in development
module.exports = (err, req, res, next) => {
    //this assumes that all express validator has keyByField set to true
    if (err instanceof ValidationError) {
        //get all the error messages if err.details is an non-empty array
        const message = Array.isArray(err.details) && err.details.length>0? 
                        err.details.map(error => Object.values(error)[0]).join(','): "Validation Error";
        err.message = message;
        err.statusCode = 400;
    }

    if (!err.statusCode || !err.message){
        err.statusCode = 500;
        err.message = "Server error";
    }

    res.status(err.statusCode);

    //send error message
    res.json({
        message: err.message,
        stack: err.stack
      });

    console.log("An error occurred!")
    console.log("Error message: " + err.message);
    console.log("Stack trace: " + err.stack);
    console.log(err);
}