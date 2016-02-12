module.exports = function(app){
	var yelpApi = require('../dao/yelp_api');
	var apicache = require('apicache').options({debug: true}).middleware;
	var api = '/react/yelp/'

	function fetchYelp(req, res, next){
		yelpApi.search(req.params.term, req.params.location, res);
	}

	app.get(api + ':term/:location', apicache('10 hours'), fetchYelp);
};