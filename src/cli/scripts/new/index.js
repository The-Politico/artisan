import inquirer from 'inquirer';

import illo from './illo';
import project from './project';

export {
  illo,
  project
};

export default async({ type }) => {
  if (!type) {
    const { func } = await inquirer.prompt([{
      type: 'list',
      name: 'func',
      message: 'What would you like to create?',
      choices: [
        {
          name: 'Project',
          value: 'project',
        },
        {
          name: 'Illustration in existing project',
          value: 'illo',
        },
      ],
    }]);
    type = func;
  }

  switch (type) {
    case 'project':
      await project();
      break;
    case 'illo':
      await illo();
      break;
  }
};
