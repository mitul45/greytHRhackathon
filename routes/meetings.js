var express = require('express');
var router = express.Router();
var Meeting = require('../helpers/models').meeting;

/* Creat a meeting */
router.post('/', function (req, res, next) {
    var owner = req.param('owner');
    var participants = req.param('participants');
    var startTime = new Date(req.param('startTime'));
    var duration = req.param('duration');
    var agenda = req.param('agenda')

    var startTime = new Date(startTime);

    function getEndTime(startTime, duration) {
        return startTime + duration;
    }

    var user = new User({
        name: name,
        reputation: reputation
    })

    user.save(function (err, user) {
        if (err){
            res.send(500, {})
            // return console.error(err);
            return
        } else {
            res.send(200, user);
            return;
        }
    });

})

module.exports = router;
