const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show,
    newTicket,
}

async function index(req, res) {
    const flights = await Flight.find({});
    res.render('flights/index', {flights});
}

function newFlight(req, res) {
    res.render('flights/new', { errorMsg: '' });
}

async function create(req, res) {
    if (req.body.departs) req.body.departs = req.body.departs.split(/\s*,\s*/);
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    try {
        await Flight.create(req.body);
        res.redirect('/flights');
    } catch (err) {
        res.render('flights/new', {errorMsg: err.message});
        console.log(err);
    }
}

async function show(req, res) {
    try {
        const flight = await Flight.findById(req.params.id);
        const tickets = await Ticket.find({flight: flight._id});
        res.render('flights/show', { title: 'Flight Details', flight, tickets });
    } catch (err) {
        res.render('flights/show', {errorMsg: err.message});
    }
}

async function newTicket(req, res) {
    try {
        const flightId = req.params.id;
        const flight = await Flight.findById(flightId);
        console.log('Flight:', flight);
        res.render('flights/tickets/new', { flightId, errorMsg: '' });
    } catch { 
        res.render('flights/tickets/new', {errorMsg: err.message});
    }
}