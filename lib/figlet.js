const figlet = require('figlet');
const { colorAxendTest } = require('./chalk');

const onError = (reject) => {
  console.log('Ocurrió un problema');
  reject();
}

const onSuccess = (msg, resolve) => {
  console.log(msg);
  resolve();
}

const printFigletMessage = (msg, isAxendColors) => new Promise((resolve, reject) => {
  return figlet(msg, (err, data) => err
    ? onError(reject)
    : onSuccess(isAxendColors ? colorAxendTest(data) : data, resolve));
});

module.exports = { printFigletMessage };