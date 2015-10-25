var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var ShoppingSchema = new Schema ({
	userId: String,
	business: String,
	shoppingList: Array,
	totalPrice: Number,
	date: String
})

var Shopping = mongoose.model('Shopping', ShoppingSchema);