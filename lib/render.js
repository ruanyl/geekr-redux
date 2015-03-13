var swig = require('swig');
var config = require('./config')();

function render(posts) {
  return swig.renderFile(config.theme_dir + '/index.html',
                         {"posts": posts});
}

module.exports = render;
