const Sequelize = require('sequelize');

let db;
if(process.env.RUN_MODE === 'LOCAL'){
    db = new Sequelize("food-waste-app", "root", "", {
        dialect: "mysql",
        host: "localhost",
        logging: false,
        define: {
          charset: "utf8",
          collate: "utf8_general_ci",
          timestamps: true,
        },
      });
}
else{
    db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
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
}

module.exports = db;