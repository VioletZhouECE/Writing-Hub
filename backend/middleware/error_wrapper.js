const express = require('express');

//async await error handling wrapper function
module.exports.errorWrapper = (fn) => {
    return (...params) => {
        return fn(...params).catch(err=> {throw err});
    }
}