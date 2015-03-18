var chalk = require('chalk');

function info(t) {
  console.log(chalk.green('INFO  ') + t);
}

function error(t) {
  console.log(chalk.red('ERROR  ') + t);
}

function warn(t) {
  console.log(chalk.yellow('WARN  ') + t);
}

module.exports = {
  info: info,
  warn: warn,
  error: error
};
