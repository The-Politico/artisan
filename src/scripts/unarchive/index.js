import { log } from 'Utils/console.js';
import selectProject from 'Utils/selectProject';
import { updateConf, getProjects } from 'Utils/conf/index.js';

export default async(opts = {}) => {
  const archivedProjects = await getProjects('archived');

  const project = await selectProject(opts.project, archivedProjects, {
    noneAvailable: 'No projects available to unarchive.',
    question: 'Which project would you like to make available?',
    doesNotExist: p => `Project "${project}" does not exist or is not archived.`,
  });

  if (!project) {
    return;
  }

  const updateSignature = { projects: {} };
  updateSignature.projects[project] = {};
  updateSignature.projects[project].status = 'alive';

  await updateConf(updateSignature);
  log(`"${project}" is now available. Use "activate" to set it as the active project.`, 'success');
};
