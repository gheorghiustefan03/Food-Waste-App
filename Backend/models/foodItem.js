const { DataTypes } = require('sequelize');

const foodItemModel = (db) => {
    const foodItem = db.define("FoodItem", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        
    })

    return foodItem;
}

module.exports = foodItemModel;