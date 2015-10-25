'use strict';

var	mongoose = require('../../config/mongoose')(),
	https = require('https');

var User = mongoose.model('User'),
	Shopping = mongoose.model('Shopping'),
	ItemsPurchased = mongoose.model('ItemsPurchased'),
	Business = mongoose.model('Business'),
	Item = mongoose.model('Item')


module.exports = function(app) {

	app.get('/', function(req, res){
		res.send("<h1> Hello </h1")
	})

	app.post('/createUser', function(req, res){
		//hardcoded data ---
		var name = "Sridatt"
		var fbid = "fbid"
		//

		var d = new Date();
		User.create({
			name: name,
			storesVisited: [],
			createdAt: d,
			facebookId: fbid
		}, function(err, result){
			console.log(result);
			res.send(result);
		})
	})

	app.post('/createBusiness', function(req, res){
		//hardcoded data---
		var name = "Target";
		var location = "Foster City, CA"
		var businessId = "99999"
		//--------

		Business.create({
			name: name,
			location: location,
			businessId: businessId
		}, function(err, result){
			console.log(result);
			res.send(result);
		})
	})

	app.post('/createItem', function(req, res){
		//hardcoded data---
		var item = "pen"
		var category = "Office Supplies"
		var price = 2.99;
		//-----------------

		Item.create({
			item: item,
			category: category,
			price: price
		}, function(err, result){
			console.log(result);
			res.send(result);
		})
	})

	app.get('/getItemInfo/:itemId', function(req, res){
		Item.find({
			_id: req.params.itemId
		}, function(err, result){
			res.send(result);
		})
	})

	app.post('/checkout', function(req, res){
		//hardcoded data ---
		var items = [
			{
				itemId: "562c126151a68b745e27cc81",
				count: 1
			},
			{
				itemId: "562c16e6bdfad2ac5e3dd82b",
				count: 2
			},
			{
				itemId: "562c17160f194cb05e2dd0a6",
				count: 1
			}
		];

		var userId = "fbid";
		var businessId = "targetid";
		var totalPrice = 100
		//--------------

		var d = new Date();

		Shopping.create({
			userId: userId,
			business: businessId,
			shoppingList: items,
			totalPrice: totalPrice,
			date: d
		}, function(err, result){

			console.log(result);

			for (var i = 0; i < items.length; i++){
				items[i].purchasedBy = userId;
				items[i].datePurchased = d;
				items[i].purchasedAt = businessId;
				ItemsPurchased.create(items[i], function(err, result){
					console.log(result)
				});
			}
		})
	})

	app.get('/getShoppingListsForCustomer/:userId', function(req, res){
		Shopping.find({
			userId: req.params.userId
		}, function(err, result){
			if (result.length == 0){
				res.send("You haven't shopped anywhere yet!");
			}

			else {
				res.send(result);
			}
		})
	})

	app.get('/getShoppingListsForBusiness/:businessId', function(req, res){
		Shopping.find({
			business: req.params.businessId
		}, function(err, result){
			if (result.length == 0){	
				res.send("No shopping lists for this business"); 
			}

			else { 
				res.send(result); 
			}
		})
	})

	app.get('/getItemsSoldByCategory/:category', function(req, res){
		ItemsPurchased.find({
			category: req.params.category
		}, function(err, result){
			if (result.length == 0){
				res.send("No item in this category has been purchased")
			}

			else {
				res.send(result);
			}
		})
	});

	app.get('/getCustomersForBusiness/:businessId', function(req, res){
		Shopping.find({
			business: req.params.businessId
		}, function(err, result){
			if (result.length == 0){
				res.send("You currently have no customers! Sucks lol")
			}

			else {
				var users = [];
				//console.log(result[0].userId)
				for (var i = 0; i < result.length; i++){
					users.push(result[i].userId);
					console.log(users);
				}
				res.send(users);
			}
		})
	})

	app.get('/')

}