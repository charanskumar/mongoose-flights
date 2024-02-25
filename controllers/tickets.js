const Ticket = require('../models/ticket');

module.exports = {
    create
};

async function create(req, res) {
    try {
        const {seat, price} = req.body;
        const flightId = req.params.id;
        const ticket = await Ticket.create({seat, price, flight: flightId});
        res.redirect(`/flights/${flightId}`);
    } catch (err) {
        res.render('flights/show', {errorMsg: err.message});
        console.log(err);
    }
}