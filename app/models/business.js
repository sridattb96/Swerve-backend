var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var BusinessSchema = new Schema ({
	name: String,
	location: Object,
	businessId: String
})

var Business = mongoose.model('Business', BusinessSchema);