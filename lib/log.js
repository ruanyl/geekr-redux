var chalk = require('chalk');

function info(t) {
  console.log(chalk.green('INFO  ') + t);
}

function error(t) {
  console.log(chalk.red('ERROR  ') + t);
}

module.exports = {
  info: info
};
