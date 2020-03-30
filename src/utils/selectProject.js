import inquirer from 'inquirer';
import { log } from 'CLI/utils/console.js';

export default async(selection, projects, logs) => {
  const {
    noneAvailable,
    question,
    doesNotExist,
  } = logs;

  if (projects.length === 0) {
    log(noneAvailable, 'info');
    return;
  }

  if (!selection) {
    const inquiry = await inquirer.prompt([{
      type: 'list',
      name: 'projectName',
      message: question,
      choices: projects
        .map(p => ({
          name: p,
          value: p,
        })),
    }]);
    selection = inquiry.projectName;
  }

  if (projects.indexOf(selection) === -1) {
    log(doesNotExist(selection), 'error');
    return;
  }

  return selection;
};
