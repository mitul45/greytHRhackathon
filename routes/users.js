var express = require('express');
var router = express.Router();
var User = require('../helpers/models').user;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Creat a user */
router.post('/', function (req, res, next) {
	var name = req.param('name');
	var reputation = req.param('reputation');

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
