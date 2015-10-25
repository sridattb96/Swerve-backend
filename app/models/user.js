var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var UserSchema = new Schema ({
	name: String,
	createdAt: String,
	facebookId: String,
	type: String
})

var User = mongoose.model('User', UserSchema);