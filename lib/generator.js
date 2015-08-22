var post = require('./post');
var config = require('./config')();
var jsonfile = require('jsonfile');
var path = require('path');

var generate = function() {
  var pages = post.getPages();
  var totalPages = Object.keys(pages).length;
  var currentPage = 1;

  for(var pageNo in pages) {
    var file = path.join(config.outputDir, pageNo + '.json');
    var json = {};
    json[pageNo] = pages[pageNo];
    json.total = totalPages;
    json.current = currentPage;

    jsonfile.writeFile(file, json, function (err) {
      if(err) {
        console.error(err);
      }
    });

    currentPage++;
  }
};

module.exports = generate;
