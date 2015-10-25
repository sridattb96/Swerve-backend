var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var ItemsPurchasedSchema = new Schema ({
	item: String,
	itemId: String,
	count: Number,
	category: String,
	priceOfEach: Number,
	purchasedBy: String, //userId
	purchasedAt: String, //businessId
	datePurchased: String
})

var ItemsPurchased = mongoose.model('ItemsPurchased', ItemsPurchasedSchema);