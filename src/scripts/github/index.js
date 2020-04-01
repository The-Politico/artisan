import open from 'open';
import { getActiveProject } from 'Utils/conf/index.js';
import { log } from 'Utils/console.js';

export default async(opts = {}) => {
  const project = await getActiveProject();

  if (!project) {
    return;
  }

  const url = `https://github.com/The-Politico/${project.repo}/`;
  await open(url);
  log(`GitHub page "${url}" opened.`, 'success');
};
