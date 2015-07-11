var help = require('./help');
var config = require('./config');
var Post = require('./post');
var render = require('./render');

var Geekr = Geekr || {};
Geekr.help = help();
Geekr.config = config();
Geekr.generate = function() {
  var post = new Post(Geekr.config.post_dir);
  render(post.getPosts());
}


module.exports = Geekr;
