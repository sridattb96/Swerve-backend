var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
  	var db = mongoose.createConnection(config.db);

  	require('../app/models/user');
  	require('../app/models/shopping');
  	require('../app/models/item');
  	require('../app/models/itemspurchased');
  	require('../app/models/business');

  	return db;
};

