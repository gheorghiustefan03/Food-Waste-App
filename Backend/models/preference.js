const { DataTypes } = require('sequelize');

const preferenceModel = (db) => {
    const preference = db.define("Preference", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })

    return preference;
}

module.exports = preferenceModel