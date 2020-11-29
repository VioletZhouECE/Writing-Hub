require('dotenv').config();

const config = {
    "database": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": "writing-hub-server",
        "host": process.env.DB_HOST, 
        "dialect": "mssql",
        "dialectOptions" : {
            "encrypt": true
        }
    },
    "storage": {
        "connectionString": process.env.AZURE_STORAGE_CONNECTION_STRING,
        "avatarContainer": "avatar"
    }
}

module.exports = config;