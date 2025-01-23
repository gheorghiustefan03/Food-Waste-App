const { db } = require('../config');
const userModel = require('./user');
const foodItemModel = require('./foodItem');
const preferenceModel = require('./preference');
const followsModel = require('./follows');

const userTable = userModel(db);
const foodItemTable = foodItemModel(db);
const preferenceTable = preferenceModel(db);
const followsTable = followsModel(db);

userTable.hasMany(foodItemTable);
foodItemTable.belongsTo(userTable);

foodItemTable.hasMany(preferenceTable);
preferenceTable.belongsTo(foodItemTable);

followsTable.belongsTo(userTable, {
    foreignKey: "followerId",
    targetKey: "id"
})
followsTable.belongsTo(userTable, {
    foreignKey: "followeeId",
    targetKey: "id"
})


module.exports = {
    userTable,
    foodItemTable,
    preferenceTable,
    followsTable
}