const rootProjectDirectory = '/Users/roeeyn/Documents/Axend/new-development/.';
const exec = require('child_process').exec;

const { lstatSync, readdirSync } = require('fs');
const path = require('path');

const isDirectory = source => lstatSync(source).isDirectory();

const getDirectories = source =>
  readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);

const getDirectoriesPromise = () => new Promise(resolve => {
  const folders = getDirectories(path.dirname(rootProjectDirectory));
  resolve(folders.map(completePath => completePath.substring(rootProjectDirectory.length-1)));
});

const openProjectsInEditor = projects => {
  const prependDir = rootProjectDirectory.substring(0, rootProjectDirectory.length-1);
  const completeProjectsDirectories = projects.map(project => `${prependDir}${project}`);
  const directoriesPromises = completeProjectsDirectories.map(projectPath => executeCodeCommand(projectPath));
  return Promise.all(directoriesPromises);
}

const executeCodeCommand = project => new Promise((resolve, reject) => {
  const dir = exec(`code ${project}`, function(err, stdout, stderr) {
    return err ? reject() : resolve();
  });
  
  // dir.on('exit', function (code) {
    
  // });
});

module.exports = { getDirectoriesPromise, openProjectsInEditor };