import { log } from 'CLI/utils/console.js';
import { getActiveProject } from 'CLI/utils/conf/index.js';

export default async() => {
  const project = await getActiveProject();

  if (!project) {
    log(`There is no active project.`);
  } else {
    log(`"${project.name}" is the active project.`);
  }
};
