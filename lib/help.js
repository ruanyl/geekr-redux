var table = require('text-table');
var chalk = require('chalk');

var help = function() {
  var h = 'Usage: geekr <command>\n\n';
  h += 'Commands\n';
  h += table([
    [ chalk.bold('  help'), 'get help'],
    [ chalk.bold('  version'), 'get version'],
    [ chalk.bold('  generate'), 'generate static files']
  ]);
  return h;
};

module.exports = help;
