const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
    name: {type: String, required: true},
    isLargerThanEarth: {type: Boolean},
});

const Planet = mongoose.model('Planet', planetSchema);

module.exports = Planet;