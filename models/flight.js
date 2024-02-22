const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new mongoose.schema( {
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United', 'Delta', 'Spirit']
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN', 'ATL', 'MIA', 'JFK'],
        default: 'ATL'
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date,
        default: function () {
            return new Date.now() + 365*24*60*60000;
            //console.log(Date.now() + 365*24*60*60000);
        }
    }
})