const Sequelize = require('sequelize');

let db = new Sequelize("food-waste-app", "root", "", {
        dialect: 'mysql',
        host: 'localhost',
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: true
        }
})

module.exports = db;