import { log } from 'Utils/console.js';
import { getActiveProject } from 'Utils/conf/index.js';

export default async() => {
  const project = await getActiveProject();

  if (!project) {
    log(`There is no active project.`);
  } else {
    log(`"${project.name}" is the active project.`);
  }
};
