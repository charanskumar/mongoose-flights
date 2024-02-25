var express = require('express');
var router = express.Router();
const flightsCtrl = require('../controllers/flights');
const ticketsCtrl = require('../controllers/tickets');

/* GET users listing. */
//router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
//});

router.get('/', flightsCtrl.index);
router.get('/new', flightsCtrl.new);
router.get('/:id', flightsCtrl.show);
router.post('/', flightsCtrl.create);
router.get('/:id/tickets/new', flightsCtrl.newTicket);

router.post('/:id', ticketsCtrl.create);

module.exports = router;
