var mongoose = require('./config/mongoose')(); // because of mongoose.js exporting the function
var app = require('./config/express')();

//app.set('port', 8000);

app.set('port', process.env.PORT || 8080);
app.set('host', process.env.HOST || '0.0.0.0');

var server = require('http').createServer(app).listen(app.get('port'), app.get('host'));

console.log('Listening on port', app.get('port'));
