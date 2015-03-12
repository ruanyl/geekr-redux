var help = require('./help');
var config = require('./config');
var Post = require('./post');

var Geekr = Geekr || {};
Geekr.help = help();
Geekr.config = config();
Geekr.post = new Post(Geekr.config.posts_dir);


module.exports = Geekr;
