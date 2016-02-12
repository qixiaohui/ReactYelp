'use strict'
var react = require('react-native');
var url = require('../util/urls');

var fetchSearch = function(term, location){
    fetch(urls.search+term+'/'+location)
      .then((response) => response.json())
      .then((responseData) => {
        return responseData.businesses;
      })
      .done();
};

module.exports.fetchSearch = fetchSearch;

