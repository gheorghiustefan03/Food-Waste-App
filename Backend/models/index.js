const { db } = require('../config');
const userModel = require('./user');
const foodItemModel = require('./foodItem');
const followsModel = require('./follows');

const userTable = userModel(db);
const foodItemTable = foodItemModel(db);
const followsTable = followsModel(db);

userTable.hasMany(foodItemTable);
foodItemTable.belongsTo(userTable);


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
    followsTable
}