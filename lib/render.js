var swig = require('swig');
var config = require('./config')();
var fs = require('fs-extra');

function render(posts) {
  var outputDir = config.output_dir;
  var themeDir = config.theme_dir;

  clean(outputDir);

  fs.ensureDirSync(outputDir);

  var content = swig.renderFile(themeDir + '/index.html',
                         {"posts": posts});
  write(outputDir + '/index.html', content);
}

function write(dest, content) {
  fs.writeFile(dest, content, function(e) {
    if(e) throw e;
  })
}

function clean(dest) {
  fs.removeSync(dest);
}

module.exports = render;
