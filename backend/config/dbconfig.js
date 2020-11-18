let config;

if (process.env.NODE_ENV == "production"){
  config = {
    "username": process.env.SQLAZURECONNSTR_DB_USER,
    "password": process.env.SQLAZURECONNSTR_DB_PASS,
    "database": "writing-hub-server",
    "host": process.env.SQLAZURECONNSTR_DB_HOST, 
    "dialect": "mssql",
    "dialectOptions" : {
      "encrypt": true
    }
  }
} else {
  require('dotenv').config();
  config = {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": "writing-hub-server",
    "host": process.env.DB_HOST, 
    "dialect": "mssql",
    "dialectOptions" : {
      "encrypt": true
    }
  }
}

module.exports = config;
