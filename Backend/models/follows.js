const { DataTypes } = require('sequelize');

const followsModel = (db) => {
    const follows = db.define("Follows", {
        followerId: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        followeeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
        
    }, {freezeTableName: true})

    return follows;
}

module.exports = followsModel;