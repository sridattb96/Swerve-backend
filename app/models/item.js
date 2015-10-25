var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var ItemSchema = new Schema ({
	item: String,
	category: String,
	price: Number
})

var Item = mongoose.model('Item', ItemSchema);