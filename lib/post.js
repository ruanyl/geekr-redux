var fs = require('fs');
var read = require('fs-readdir-recursive');
var yaml = require('js-yaml');

/*
 * TODO: The time of posts should take timezone in to consideration
 */
var Post = function(postsDir) {
  this.postsDir = postsDir;
  this.postsList = [];
}
Post.prototype.listPosts = function() {
  var postsList = read(this.postsDir);
  return postsList;
}

Post.prototype.getPosts = function() {
  var postsList = this.listPosts();
  var posts = [];
  for(var i = 0; i < postsList.length; i++) {
    var postsPerFile;
    try {
      postsPerFile = yaml.safeLoad(fs.readFileSync(this.postsDir + postsList[i]));
    } catch (e) {
      console.log(e);
    }

    if(postsPerFile) {
      postsPerFile = postsPerFile['posts'];
      postsPerFile.forEach(function(post) {
        posts.push(post);
      });
    }

  }

  return posts;
}

module.exports = Post;
