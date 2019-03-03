const clear  = require('clear');
const { getDirectoriesPromise, openProjectsInEditor } = require('./files');
const { printFigletMessage } = require('./figlet');
const { showOptions } = require('./inquirer');
const { colorAxendTest } = require('./chalk');

const main = () => {

  clear();

  return printFigletMessage('Launch Axend', true)
    .then(() => getDirectoriesPromise())
    .then(directories => showOptions(directories))
    .then(answers => openProjectsInEditor(answers.ax_projects))
    .then(() => console.log(colorAxendTest('Ten un excelente día! 🏖️')))
    .catch(err => console.error(err));
};

module.exports = { main };