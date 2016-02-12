module.exports = function(app){
	var yelpApi = require('../dao/yelp_api');
	var apicache = require('apicache').options({debug: true}).middleware;
	var api = '/react/yelp/'
    var apiBusiness = '/react/business/';

	function fetchYelp(req, res, next){
		yelpApi.search(req.params.term, req.params.location, req.params.offset, res);
	}
    
    function fetchBusiness(req, res, next){
        yelpApi.business(req.params.id, res);
    }

	app.get(api + ':term/:location/:offset', apicache('5 minutes'), fetchYelp);
    app.get(apiBusiness + ':id', apicache('5 minutes'), fetchBusiness)
};