var fs = require('fs');

var Post = function(postsDir) {
  this.postsDir = postsDir;
  this.postsList = [];
}
Post.prototype.listPosts = function() {
  var postsList = fs.readdirSync(this.postsDir);
  return postsList;
}

Post.prototype.getPosts = function() {
}

module.exports = Post;
