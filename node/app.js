(function(){
	var express = require('express');
	var app = express();
	var bodyParser  =require('body-parser');
	var compress = require('compression');
	var cors = require('cors');
	var logger = require('morgan');
	var port = process.env.PORT || 8000;
	var routes;

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(compress());
	app.use(cors());
	app.use(logger('dev'));

	routes = require('./route/index')(app);
    app.get('/ping',function(req, res){
        console.log(req.body);
        res.send('pong');
    });

	app.listen(port, function(){
		console.log("express listening on port" + port);
	})
}())