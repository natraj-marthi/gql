const Sequelize = require('sequelize');

const sequelize = new Sequelize('myDB', 'postgres', 'postgres', {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
});

const modelDefiners = [
	require('./models/event'),
	require('./models/location'),
	// require('./models/attendee'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

for (const model of Object.keys(sequelize.models)) {
    console.log(model);
    sequelize.models[model].sync({force: true});
}

const {events, locations} = sequelize.models;

events.hasOne(locations, {
    foreignKey: 'location_id',
    targetKey: 'lid'
});

locations.belongsTo(events, {
    foreignKey: 'event_id',
    targetKey: 'eid',
});


module.exports = {
    sequelize,
    eventModel: sequelize.models.events,
    locationModel: sequelize.models.locations,
};
