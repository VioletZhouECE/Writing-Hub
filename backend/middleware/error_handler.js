const {ValidationError} = require('express-validation')

//error handler used in development
module.exports = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        err.message = err.details[0];
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