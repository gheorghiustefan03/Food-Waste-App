const { db } = require('../config');
const userModel = require('./user');


const userTable = userModel(db);

//departmentTable.hasMany(userTable);
//userTable.belongsTo(departmentTable);

module.exports = {
    userTable
}