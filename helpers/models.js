var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/greyt');

// create connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("db is connected!")
});

// Define db schemas

// Users
var UserSchema = mongoose.Schema({
    name: String,
    reputation: Number,
    admin: { type: Boolean, default: false }
});

var UserModel = mongoose.model('User', UserSchema);

// Facilities
var FacilitySchema = mongoose.Schema({
	type: String
})

var FacilityModel = mongoose.model('Facility', FacilitySchema);

// Conference rooms
var RoomSchema = mongoose.Schema({
	name: String,
	capacity: Number,
	faciities: [
			{ 
				type: 'ObjectId', 
				ref: 'Facility'
			}
	]
})

var RoomModel = mongoose.model('Room', RoomSchema);

// Meetings
var MeetingSchema = mongoose.Schema({
	owner: { type: 'ObjectId', ref: 'User' },
	participants: [{ type: 'ObjectId', ref: 'User' }],
	room: { type: 'ObjectId', ref: 'Room' },
	startTime: Date,
	endTime: Date,
	priority: Number
});

var MeetingModel = mongoose.model('Meeting', MeetingSchema);

// exporting all data models
module.exports = {
	user: UserModel,
	room: RoomModel,
	facility: FacilityModel,
	meeting: MeetingModel
}