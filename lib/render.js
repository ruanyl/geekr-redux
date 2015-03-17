var swig = require('swig');
var config = require('./config')();
var fs = require('fs-extra');
var chalk = require('chalk');
var log = require('./log');

function render(posts) {
  var outputDir = config.output_dir;
  var themeDir = config.theme_dir;

  clean(outputDir);

  fs.ensureDirSync(outputDir);
  copyStatics();

  var content = swig.renderFile(themeDir + 'index.html',
                         {"posts": posts});
  write(outputDir + 'index.html', content);
}

function write(dest, content) {
  fs.writeFile(dest, content, function(e) {
    if(e) throw e;
    log.info('Generated ' + dest);
  })
}

function clean(dest) {
  fs.removeSync(dest);
}

function copyStatics() {
  fs.copy(config.theme_dir + 'css', config.output_dir + 'css', function(e) {
    if(e) log.error(e);
    log.info('Copy Theme CSS: ' + config.theme_dir + 'css -> ' + config.output_dir + 'css');
  });
  fs.copy(config.theme_dir + 'js', config.output_dir + 'js', function(e) {
    if(e) log.error(e);
    log.info('Copy Theme JS: ' + config.theme_dir + 'js -> ' + config.output_dir + 'js');
  });
  fs.copy(config.theme_dir + 'image', config.output_dir + 'image', function(e) {
    if(e) log.error(e);
    log.info('Copy Theme Image: ' + config.theme_dir + 'image -> ' + config.output_dir + 'image');
  });
}

module.exports = render;
