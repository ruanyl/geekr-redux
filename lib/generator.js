var postService = require('./post');
var config = require('./config')();
var jsonfile = require('jsonfile');
var path = require('path');
var url = require('url');
var fs = require('fs-extra');
var log = require('./log');
var swig = require('swig');
var RSS = require('rss');
var moment = require('moment');

var generate = function() {
  var posts = postService.getPosts();
  var pages = postService.paginate(posts);
  var totalPages = Object.keys(pages).length;
  var currentPage = 1;

  //generate .json files
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

  //generate rss feed
  var feedOptions = {
    title: config.title,
    feed_url: url.resolve(config.url, 'feed.xml'),
    site_url: config.url
  };
  var feed = new RSS(feedOptions);
  posts.forEach(function(post, i) {
    if(i < 10) { // feed maximum
      feed.item({
        title: post.title,
        description: post.url,
        url: post.url,
        guid: post.url,
        date: moment.utc(post.time, 'YY-MM-DD H:m:s').format()
      });
    }
  });
  var xml = feed.xml({indent: true});

  //write feed.xml
  fs.writeFile(path.join(config.outputDir, 'feed.xml'), xml, function(e) {
    if(e) {
      throw e;
    }
    log.info('Write feed xml ' + config.outputDir + 'feed.xml');
  });

  //write cname
  fs.writeFile(path.join(config.outputDir, 'CNAME'), config.cname, function(e) {
    if(e) {
      throw e;
    }
    log.info('Write CNAME ' + config.outputDir + 'CNAME');
  });

  //generate index.html
  var tplPath = path.join(__dirname, '../index_tpl.html');
  var indexPath = path.join(config.outputDir, '../app/index.html');
  var indexHtml = swig.renderFile(tplPath, {
    title: config.title,
    name: config.name,
    githubUrl: config.githubUrl
  });
  fs.writeFile(indexPath, indexHtml, function(e) {
    if(e) {
      throw e;
    }
    log.info('Write index.html ' + indexPath);
  });
};

module.exports = generate;
