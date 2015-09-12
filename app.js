var express = require('express'),
    mongoose = require('mongoose');
	
var db = mongoose.connect('mongodb://localhost/booksAPI');
	
var Book = require('./models/bookModel');
	
var app = express();
var port = process.env.PORT || 3000;

var bookRouter = express.Router();

app.use('/api', bookRouter);

bookRouter.route('/Books')
	.get(function(req, res) {
		var query = {};
		
		if (req.query.title) {query.title = req.query.title;}
		if (req.query.author) {query.author = req.query.author;}
		if (req.query.genre) {query.genre = req.query.genre;}
		if (req.query.read) {query.read = req.query.read;}
		
		Book.find(query, function(err, books){
			if(err)
				res.status(500).send(err);
			else
				res.json(books);
		});
	});

app.get('/', function(req, res) {
	res.send('Welcome to my API!');
});

var server = app.listen(port, function() {
  //var host = server.address().address;
  //var port = server.address().port;

  //console.log('Example app listening at http://%s:%s', host, port);
  
  console.log('Gulp is running my app on PORT: ' + port);
});
