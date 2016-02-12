var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: '6b7WXw-wscxfx9Y9vXFErQ',
  consumer_secret: 'G_npMOemnLJnbvEPCVvFl89xmH0',
  token: '9RDgUkrgfqOGUF7QlY_T3TRG0RYbndvE',
  token_secret: 'xaIuIUhbU0I-qwJ2bbzOEqiwiJM',
});

var search = function(term, location, res){
	yelp.search({ term: term, location: location })
	.then(function (data) {
	  res.send(data);
	})
	.catch(function (err) {
	  console.error(err);
	});
}

module.exports.search = search;