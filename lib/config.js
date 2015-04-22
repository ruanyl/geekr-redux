var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');

function config() {
  var conf;

  try {
    conf = yaml.safeLoad(fs.readFileSync(__dirname + '/../_config.yml', 'utf8'));
    conf.post_dir = path.normalize(__dirname + '/../' + conf.post_dir + '/');
    conf.theme_dir = path.normalize(__dirname + '/../' + conf.theme_dir + '/' + conf.theme + '/');
    conf.output_dir = path.normalize(__dirname + '/../' + conf.output_dir + '/');
    conf.root = path.normalize(conf.root + '/');
  } catch (e) {
    console.log(e);
  }

  return conf;
}

module.exports = config;
