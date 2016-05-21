var express = require('express');
var router = express.Router();
var Meeting = require('../helpers/models').meeting;

/* Creat a meeting */
router.post('/', function (req, res, next) {
    var owner = req.param('owner');
    var participants = req.param('participants');
    var startTime = req.param('startTime');
    var duration = req.param('duration');
    var agenda = req.param('agenda');
    var room = req.param('room');

    startTime = new Date(startTime);
    var endTime = getEndTime(startTime, duration);

    var meeting = new Meeting({
        owner: owner,
        participants: participants,
        room: room,
        startTime: startTime,
        endTime: endTime,
        agenda: agenda,
        cancelled: false
    })

    meeting.save(function (err, meeting) {
        if (err) 
            res.send(500, {})
        else
            res.send(200, meeting);
        return;
    });


    // Utils
    /**
     * @param  {startTime} javascript Date obj
     * @param  {duration}  Number in minutes
     * @return {endTime}   javascript Date obj
     */
    function getEndTime(startTime, duration) {
        return (new Date(startTime.getTime() + duration* 60 * 1000));
    }


})

module.exports = router;
