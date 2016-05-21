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
    facilities: [{
                count: Number,
                type: { 
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'Facility'
                }
            }],
    floor: Number,
    active: { type: Boolean, default: true }
})

var RoomModel = mongoose.model('Room', RoomSchema);

// Meetings
var MeetingSchema = mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    startTime: Date,
    endTime: Date,
    priority: Number,
    agenda: String
});

var MeetingModel = mongoose.model('Meeting', MeetingSchema);

// exporting all data models
module.exports = {
    user: UserModel,
    room: RoomModel,
    facility: FacilityModel,
    meeting: MeetingModel
}