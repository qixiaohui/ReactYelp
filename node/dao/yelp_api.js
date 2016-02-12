var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: '6b7WXw-wscxfx9Y9vXFErQ',
  consumer_secret: 'G_npMOemnLJnbvEPCVvFl89xmH0',
  token: '9RDgUkrgfqOGUF7QlY_T3TRG0RYbndvE',
  token_secret: 'xaIuIUhbU0I-qwJ2bbzOEqiwiJM',
});

var search = function(term, location, offset, res){
	yelp.search({ term: term, location: location, limit: 20, offset: offset})
	.then(function (data) {
	  res.send(data);
	})
	.catch(function (err) {
	  console.error(err);
	});
}

var business = function(id, res){
    yelp.business(id)
        .then(function(data){
        res.send(data);
    })
        .catch(function(err){
        console.log(err);
    });
}

module.exports.search = search;
module.exports.business = business;