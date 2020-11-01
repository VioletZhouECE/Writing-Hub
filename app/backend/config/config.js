require('dotenv').config();

let config = {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": "writing-hub-server",
    "host": process.env.DB_HOST, 
    "dialect": "mssql",
    "dialectOptions" : {
      "encrypt": true
    }
}

module.exports = config;
