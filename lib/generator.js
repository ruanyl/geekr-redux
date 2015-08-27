var post = require('./post');
var config = require('./config')();
var jsonfile = require('jsonfile');
var path = require('path');
var fs = require('fs-extra');
var log = require('./log');

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

  //write cname
  fs.writeFile(path.join(config.outputDir, 'CNAME'), config.cname, function(e) {
    if(e) throw e;
    log.info('Write CNAME ' + config.outputDir + 'CNAME');
  });
};

module.exports = generate;
