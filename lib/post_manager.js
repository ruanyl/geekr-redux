var fs = require('fs');
var read = require('fs-readdir-recursive');
var yaml = require('js-yaml');
var url = require('url');
var ensureKeys = require('ensure-keys');
var log = require('./log');
var config = require('./config')();

/*
 * TODO: The time of posts should take timezone in to consideration
 */


var lsPosts = function() {
  var postsList = read(config.post_dir);
  return postsList;
};

var getPosts = function() {
  var postsList = lsPosts();
  var posts = {
    all: []
  };

  for(var i = 0; i < postsList.length; i++) {
    var postsPerFile;
    var postFileName = config.post_dir + postsList[i];
    try {
      postsPerFile = yaml.safeLoad(fs.readFileSync(postFileName));
    } catch (e) {
      console.log(e);
    }

    if(postsPerFile) {
      postsPerFile = postsPerFile['posts'];
      postsPerFile.forEach(function(post) {
        ensureKeys(post, ['title', 'url'], function(missedKey) {
          log.error('*' + missedKey + '* should not empty');
          throw 'Error happened when processing: ' + postFileName;
        });
        post = processPost(post);
        var category = post['category'];
        if(category) {
          if(posts[category]) {
            posts[category].push(post);
          } else {
            posts[category] = [];
            posts[category].push(post);
          }
        }
        posts.all.push(post);
      });
    }

  }

  return sort(posts);
};

var sort = function(posts) {
  for(var category in posts) {
    posts[category].sort(function(post1, post2) {
      return post2['time'] - post1['time'];
    });
  }
  return posts;
};

var processPost = function(post) {
  var tagStr =  post['tag'];

  post.tags = tagStr ? processTags(tagStr) : {};
  post.hostname = url.parse(post.url).hostname;

  return post;
}

var processTags = function(tagStr) {
  var tags = {};
  var defaultTagColor = {
    HTML: '#e44b23',
    JS: '#f1e05a',
    ES6: '#f1e05a',
    ES7: '#f1e05a',
    COFFEE: '#244776',
    HTTP: '#00A1D9',
    HTTP2: '#00A1D9',
    ARCHITECTURE: '#04D9D9',
    REACT: '#61DAFB',
    REACTJS: '#61DAFB',
    ANGULAR: '#DD1B16',
    ANGULARJS: '#DD1B16'
  };
  tagStr.replace(' ', '')
        .split(',')
        .forEach(function(ele) {
          var tagInfo = ele.split('#');
          var tagColor = tagInfo[1] ? '#' + tagInfo[1] : defaultTagColor[tagInfo[0].toUpperCase()];
          tags[tagInfo[0]] = tagColor ? tagColor : '#f1f1f1';
        });

  return tags;
}

module.exports = {
  getPosts: getPosts,
  lsPosts: lsPosts
};
