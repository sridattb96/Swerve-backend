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
		res.send("<h1> Hello </h1>")
	});

	//***HARDCODE
	app.post('/login/:fbid', function(req, res){
		//hardcoded data ---
		var name = "Sridatt"
		// var fbid = "asdfasdf"
		//
		console.log("gets in login")

		User.find({
			facebookId: req.params.fbid
		}, function(err, result){
			if (err) { console.log(err); res.send({error:true})}

			else if (result.length == 0){
				var d = new Date();
				User.create({
					name: name,
					createdAt: d,
					facebookId: req.params.fbid,	
					type: ""
				}, function(err, result){
					console.log("just created one")
					console.log(result);
					var arr = [result];
					res.send(arr) //wrap in array
				})
			}

			else {
				console.log("found user in database")
				res.send(result); 
			}
		})
	})

	app.get('/logout', function(req, res){
		req.session.destroy();
		res.send("session destroyed")
	})

	// app.post('/createUser', function(req, res){
	// 	//hardcoded data ---
	// 	var name = "Sridatt"
	// 	var fbid = "fbid"
	// 	//

	// 	var d = new Date();
	// 	User.create({
	// 		name: name,
	// 		createdAt: d,
	// 		facebookId: fbid
	// 	}, function(err, result){
	// 		console.log(result);
	// 		res.send(result);
	// 	})
	// })

	app.post('/markType/:fbid/:type', function(req, res){
		console.log("inside markType")
		User.update({ facebookId: req.params.fbid }, {
			type: req.params.type
		}, function(err, result){
			if (result.length == 0){
				res.send({ error: true });
			}
			else {
				res.send(result)
			}
		})
	})

	//***HARDCODE
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

	app.post('/createItem/:businessId', function(req, res){

		Item.create({
			item: req.body.item,
			category: req.body.category,
			price: req.body.price,
			business: req.params.businessId
		}, function(err, result){
			if (err){console.log(err)}

			console.log(result);
			res.send(result);
		})
	})

	app.post('/checkout/:fbid', function(req, res){
		console.log('inside checkout')
		//hardcoded data ---
		// var items = [
		// 	{
		// 		itemId: "562c126151a68b745e27cc81",
		// 		count: 1
		// 	},
		// 	{
		// 		itemId: "562c16e6bdfad2ac5e3dd82b",
		// 		count: 2
		// 	},
		// 	{
		// 		itemId: "562c17160f194cb05e2dd0a6",
		// 		count: 1
		// 	}
		// ];

		// var userId = "fbid";
		// var businessId = "targetid";
		// var totalPrice = 100
		//--------------

		var d = new Date();

		Shopping.create({
			userId: req.params.fbid,
			business: req.body.businessId,
			shoppingList: req.body.items,
			totalPrice: req.body.totalPrice,
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

	app.get('/getItemInfo/:itemId', function(req, res){
		Item.find({
			_id: req.params.itemId
		}, function(err, result){
			res.send(result);
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
				for (var i = 0; i < result.length; i++){
					users.push(result[i].userId);
					console.log(users);
				}
				res.send(users);
			}
		})
	})

	// app.get('/dataToVisualize/:businessId', function(req, res){
	// 	ItemsPurchased.find({
	// 		business: req.params.businessId
	// 	}, function(err, result){
	// 		var hash = {};
	// 		for (var i = 0; i < result.length; i++){
	// 			if (hash[result[i].item] > 0){
	// 				hash[result[i].item]++;
	// 			}
	// 			else {	
	// 				hash[result[i].item] = 0;
	// 			}
	// 		}

	// 		var highest = 0;
	// 		    var arr = [];
	// 		    for (var prop in hash) {
	// 		        if( hash.hasOwnProperty( prop ) ) {
	// 		            if(hash[prop] > highest ){ 
	// 		                arr = [];
	// 		                highest = hash[prop];
	// 		                arr[prop] = highest;
	// 		            }

	// 		        } 
	// 		    }
	// 		var str = result.length;
	// 		res.send(str)
	// 	})
	// })

}