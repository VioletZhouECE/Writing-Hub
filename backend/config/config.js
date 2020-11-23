const config_dev = require('./config_dev');
const config_prod= require('./config_prod');

let config; 

if (process.env.NODE_ENV == "production"){
    config = config_prod;
} else {
    config = config_dev;
}

module.exports = config;