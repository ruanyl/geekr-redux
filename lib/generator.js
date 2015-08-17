var post = require('./post');
var config = require('./config')();
var jsonfile = require('jsonfile');
var path = require('path');

var generate = function() {
  var posts = post.getPosts();
  var file = path.join(config.outputDir, 'output.json');

  jsonfile.writeFile(file, posts, function (err) {
    console.error(err);
  });
};

module.exports = generate;
