const config = {
  "database": {
    "username": process.env.SQLAZURECONNSTR_DB_USER,
    "password": process.env.SQLAZURECONNSTR_DB_PASS,
    "database": "writing-hub-server",
    "host": process.env.SQLAZURECONNSTR_DB_HOST, 
    "dialect": "mssql",
    "dialectOptions" : {
      "encrypt": true
    }
  },
  "storage": {
    "connectionString": process.env.CUSTOMCONNSTR_AZURE_STORAGE_CONNECTION_STRING,
    "avatarContainer": "avatar"
  }
}

module.exports = config;