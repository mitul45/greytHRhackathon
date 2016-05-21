var express = require('express');
var router = express.Router();
var Room = require('../helpers/models').room;
var Facility = require('../helpers/models').facility;

/* Creat a meeting */
router.post('/', function (req, res, next) {
    var name = req.param('name');
    var capacity = req.param('capacity');
    var floor = req.param('floor');
    var facilities = req.param('facilities');

    var room = new Room({
        name: name,
        capacity: capacity,
        floor: floor,
        facilities: facilities 
    })

    room.save(function (err, room) {
        if (err){
            res.send(500, {})
            // return console.error(err);
            return
        } else {
            res.send(200, room);
            return;
        }
    });
})

module.exports = router;
