var fs = require('fs');
var read = require('fs-readdir-recursive');
var yaml = require('js-yaml');
var url = require('url');
var ensureKeys = require('ensure-keys');
var log = require('./log');

/*
 * TODO: The time of posts should take timezone in to consideration
 */
var Post = function(postsDir) {
  this.postsDir = postsDir;
  this.postsList = [];
};
Post.prototype.listPosts = function() {
  var postsList = read(this.postsDir);
  return postsList;
};

Post.prototype.getPosts = function() {
  var postsList = this.listPosts();
  var posts = [];
  for(var i = 0; i < postsList.length; i++) {
    var postsPerFile;
    var postFileName = this.postsDir + postsList[i];
    try {
      postsPerFile = yaml.safeLoad(fs.readFileSync(postFileName));
    } catch (e) {
      console.log(e);
    }

    if(postsPerFile) {
      postsPerFile = postsPerFile['posts'];
      var that = this;
      postsPerFile.forEach(function(post) {
        ensureKeys(post, ['title', 'url'], function(missedKey) {
          log.error('*' + missedKey + '* should not empty');
          throw 'Error happened when processing: ' + postFileName;
        });
        post = that.processPost(post);
        posts.push(post);
      });
    }

  }

  return this.sort(posts);
};

Post.prototype.sort = function(posts) {
  return posts.sort(function(post1, post2) {
    return post2['time'] - post1['time'];
  });
};

Post.prototype.processPost = function(post) {
  var tagStr =  post['tag'];

  post.tags = tagStr ? this.processTags(tagStr) : {};
  post.hostname = url.parse(post.url).hostname;

  return post;
}

Post.prototype.processTags = function(tagStr) {
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

module.exports = Post;
