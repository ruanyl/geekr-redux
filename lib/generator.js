var post = require('./post');
var config = require('./config')();
var jsonfile = require('jsonfile');
var path = require('path');

var generate = function() {
  var pages = post.getPages();
  var totalPages = Object.keys(pages).length;

  for(var pageNo in pages) {
    var file = path.join(config.outputDir, pageNo + '.json');
    var json = {};
    json[pageNo] = pages[pageNo];
    json.totalPages = totalPages;

    jsonfile.writeFile(file, json, function (err) {
      if(err) {
        console.error(err);
      }
    });
  }
};

module.exports = generate;
