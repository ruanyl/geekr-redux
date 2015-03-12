var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');

function config() {
  var conf;

  try {
    conf = yaml.safeLoad(fs.readFileSync(__dirname + '/../_config.yml', 'utf8'));
    conf.posts_dir = path.normalize(__dirname + '/../' + conf.posts_dir);
  } catch (e) {
    console.log(e);
  }

  return conf;
}

module.exports = config;
