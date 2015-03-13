var help = require('./help');
var config = require('./config');
var Post = require('./post');
var render = require('./render');

var Geekr = Geekr || {};
Geekr.help = help();
Geekr.config = config();
Geekr.post = new Post(Geekr.config.post_dir);
Geekr.render = render;

module.exports = Geekr;
