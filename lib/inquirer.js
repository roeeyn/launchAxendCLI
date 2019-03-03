const inquirer = require('inquirer');

const getOptionsFromFolderFilter = folders => folders.map(folder => ({ name: folder }));

const getInquirerChoices = filter => [
  new inquirer.Separator('🔰 Frontend'),
  getOptionsFromFolderFilter(filter[0]),
  new inquirer.Separator('😎 Backend'),
  getOptionsFromFolderFilter(filter[1]),
  new inquirer.Separator('🤷‍ Extras'),
  getOptionsFromFolderFilter(filter[2]),
].flatMap(name => name);

const showOptions = projects => {

  const filter = projects.reduce((carry, project) => {
    const index = project.search('front') >= 0 ? 0 : project.search('back') >= 0 ? 1 : 2;
    carry[index].push(project);
    return [...carry];
  }, [[], [], []]); // front, back, extras

  const choices = getInquirerChoices(filter);

  return inquirer
    .prompt([{
        type: 'checkbox',
        message: '¿Qué proyectos quieres abrir?',
        name: 'ax_projects',
        choices,
        validate: function(answer) {

          const res = answer.length >= 1;
          console.log(res ? 'Abriendo Proyectos 🔥' : 'Debes seleccionar por lo menos uno');
          return res;

        }
      }
    ]);
  }

  module.exports = { showOptions };