const express = require('express');

//async await error handling wrapper function
//this does not work: req, res, next are undefined
module.exports.wrapper = async (fn, params) => {
    const func = async function(req, res, next){
        let e = null;
        try{
            await fn(params);
        } catch (err){
            e = err;
            next(e);
        }
        if (!e){
            next();
        }
    }
    return func(req, res, next);
}