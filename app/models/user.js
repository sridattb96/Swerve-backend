var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var UserSchema = new Schema ({
	name: String,
	StoresVisited: Array,
	createdAt: String,
	facebookId: String
})

var User = mongoose.model('User', UserSchema);