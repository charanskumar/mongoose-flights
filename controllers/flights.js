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
        res.redirect('/flights/new');
    } catch (err) {
        res.render('flights/new', {errorMsg: err.message});
        console.log(err);
    }
}

async function show(req, res) {
    try {
        const flight = await Flight.findById(req.params.id);
    //Flight.findById(req.params.id, function(err, flight) {
        const tickets = await Ticket.find({flight: flight._id});
        //Ticket.find({flight: flight._id}, function(err, tickets) {
            res.render('flights/show', { title: 'Flight Details', flight, tickets });
        //});
    //});
    } catch (err) {
        res.render('flights/show', {errorMsg: err.message});
    }
}

function newTicket(req, res) {
    const flightId = req.params.id;
    res.render('flights/tickets/new', { flightId, errorMsg: '' });
}