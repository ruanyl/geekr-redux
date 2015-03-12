var fs = require('fs');
var read = require('fs-readdir-recursive');

var Post = function(postsDir) {
  this.postsDir = postsDir;
  this.postsList = [];
}
Post.prototype.listPosts = function() {
  var postsList = read(this.postsDir);
  return postsList;
}

Post.prototype.getPosts = function() {
}

module.exports = Post;
