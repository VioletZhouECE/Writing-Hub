//error handler used in development
module.exports = (err, req, res, next) => {
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
}