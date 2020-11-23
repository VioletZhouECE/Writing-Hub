let config; 

if (process.env.NODE_ENV == "production"){
    config = require('./config_prod');
} else {
    config = require('./config_dev');
}

module.exports = config;