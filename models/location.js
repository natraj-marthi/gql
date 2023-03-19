const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('locations', {
        lid: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        location: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    }, {
        timestamps: false
    });
};
