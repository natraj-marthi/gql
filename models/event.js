/**
 * Event
 * id, name, location (1-1), attendees (1-*), date, speaker (1-*)
 * 
 */
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('events', {
        eid: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
    }, {
        timestamps: false,
    });
}
