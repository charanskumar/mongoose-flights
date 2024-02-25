const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema( {
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN', 'ATL', 'MIA', 'JFK'],
    },
    arrival: {type: Date},
});

const flightSchema = new mongoose.Schema( {
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United', 'Delta', 'Spirit'],
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN', 'ATL', 'MIA', 'JFK'],
        default: 'ATL',
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999,
    },
    departs: {
        type: Date,
        default: function() {
            return new Date().setFullYear(new Date().getFullYear + 1);
        },
    },
    destinations: [destinationSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);