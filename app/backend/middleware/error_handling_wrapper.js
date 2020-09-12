//async await error handling wrapper function
export default wrapper = fn => {
    return async function(req, res, next){
        let e = null;
        try{
            await fn(req, res, next);
        } catch (err){
            e = err;
            next(e);
        }
        if (!e){
            next();
        }
    }
}