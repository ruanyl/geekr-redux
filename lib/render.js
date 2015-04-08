var swig = require('swig');
var config = require('./config')();
var fs = require('fs-extra');
var chalk = require('chalk');
var log = require('./log');
var path = require('path');

function render(posts) {
  var outputDir = config.output_dir;
  var themeDir = config.theme_dir;

  clean(outputDir);

  fs.ensureDirSync(outputDir);
  copyStatics();

  var categories = Object.keys(posts);
  for(var category in posts) {
    var tpl = themeDir + 'index.html';
    var data = {"data": posts[category],
                "category": category,
                "categories": categories};
    var content = swig.renderFile(tpl,data);

    if(category === 'All') {
      write(outputDir + 'index.html', content);
    }
    write(outputDir + category + '/index.html', content);
  }
}

function write(dest, content) {
  fs.ensureDir(path.dirname(dest), function(e) {
    fs.writeFile(dest, content, function(e) {
      if(e) throw e;
      log.info('Generated ' + dest);
    });
  });
}

function clean(dest) {
  fs.removeSync(dest);
}

function copyStatics() {
  fs.ensureDir(config.theme_dir + 'css', function(e) {
    fs.copy(config.theme_dir + 'css', config.output_dir + 'css', function(e) {
      if(e) throw e;
      log.info('Copy Theme CSS: ' + config.theme_dir + 'css -> ' + config.output_dir + 'css');
    });
  });

  fs.ensureDir(config.theme_dir + 'js', function(e) {
    fs.copy(config.theme_dir + 'js', config.output_dir + 'js', function(e) {
      if(e) throw e;
      log.info('Copy Theme JS: ' + config.theme_dir + 'js -> ' + config.output_dir + 'js');
    });
  });

  fs.ensureDir(config.theme_dir + 'image', function(e) {
    fs.copy(config.theme_dir + 'image', config.output_dir + 'image', function(e) {
      if(e) throw e;
      log.info('Copy Theme Image: ' + config.theme_dir + 'image -> ' + config.output_dir + 'image');
    });
  });
}

module.exports = render;
