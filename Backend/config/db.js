const Sequelize = require('sequelize');

let db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        dialect: 'mssql',
        host: process.env.DB_HOST,
        dialectOptions: {
            options: {
                encrypt: true,
                enableArithAbort: true
            },
        },
        logging: false
})

module.exports = db;