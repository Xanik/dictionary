var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var slangs = require('./slangs.json');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
	console.log(`${req.method} request for ${req.url} - ${JSON.stringify(req.body)}`);

	next();
});


app.use(express.static('./public'));
app.use(cors());

app.get("/dictionary-api", function(req, res){
	res.json(slangs);
});

app.post("/dictionary-api", function(req, res){
	slangs.push(req.body);
	res.json(slangs);
})

app.delete("/dictionary-api/:term", function(req, res){
	slangs = slangs.filter((definition)=>{
		return definition.term.toLowerCase() !== req.params.term.toLowerCase();
	});
	res.json(slangs);
})

app.listen(3000);

console.log('Express app running on port 3000');

module.exports = app;