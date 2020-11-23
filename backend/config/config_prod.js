const config = {
    "username": process.env.SQLAZURECONNSTR_DB_USER,
    "password": process.env.SQLAZURECONNSTR_DB_PASS,
    "database": "writing-hub-server",
    "host": process.env.SQLAZURECONNSTR_DB_HOST, 
    "dialect": "mssql",
    "dialectOptions" : {
      "encrypt": true
    }
}

module.exports = config;