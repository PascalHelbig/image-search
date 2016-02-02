var express = require('express');
var dotenv = require('dotenv');
var request = require('request');

var app = express();
dotenv.load();

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/imagesearch/:search', function (req, res) {
  var offset = req.query.offset || -1;
  var url = "https://api.imgur.com/3/gallery/search/top?q=" + req.params.search;
  request({
    url: url,
    json: true,
    headers: {
      Authorization: 'Client-ID ' + process.env.IMGUR_CLIENT_ID
    }
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var result = body.data.map(function(image) {
        return {
          url: image.link,
          type: image.type,
          title: image.title
        };
      }).slice(0, offset);
      res.json(result);
    } else {
      res.json({error: error, status: response.statusCode});
    }
  });
});

app.listen(8080, function () {
  console.log('App listening on port 8080');
});
