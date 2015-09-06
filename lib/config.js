var yaml = require('js-yaml');
var fs = require('fs-extra');
var path = require('path');

function config() {
  var conf;

  conf = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '/../_config.yml'), 'utf8'));
  conf.postDir = path.normalize(path.join(__dirname, '/../', conf.postDir, '/'));
  conf.outputDir = path.normalize(path.join(__dirname, '/../', conf.outputDir, '/'));

  fs.ensureDirSync(conf.outputDir);

  return conf;
}

module.exports = config;
