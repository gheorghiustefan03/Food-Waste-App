const { db } = require('../config');
const userModel = require('./user');
const foodItemModel = require('./foodItem');
const preferenceModel = require('./preference');

const userTable = userModel(db);
const foodItemTable = foodItemModel(db);
const preferenceTable = preferenceModel(db);

userTable.hasMany(foodItemTable);
foodItemTable.belongsTo(userTable);

foodItemTable.hasMany(preferenceTable);
preferenceTable.belongsTo(foodItemTable);

//departmentTable.hasMany(userTable);
//userTable.belongsTo(departmentTable);

module.exports = {
    userTable,
    foodItemTable,
    preferenceTable
}