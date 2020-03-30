import { log } from 'CLI/utils/console.js';
import selectProject from 'CLI/utils/selectProject';
import { updateConf, getProjects, getActiveProject } from 'CLI/utils/conf/index.js';

export default async(opts = {}) => {
  const activeProject = await getActiveProject();
  const allProjects = await getProjects();

  const project = await selectProject(opts.project, allProjects, {
    noneAvailable: 'No projects available to archive.',
    question: 'Which project would you like to archive?',
    doesNotExist: p => `Project "${p}" does not exist or is archived.`,
  });

  if (!project) {
    return;
  }

  const updateSignature = { projects: {} };
  if (activeProject && project === activeProject.name) {
    updateSignature.active = null;
  }
  updateSignature.projects[project] = {};
  updateSignature.projects[project].status = 'archived';

  await updateConf(updateSignature);
  log(`"${project}" is now archived. Use "unarchive" to undo this.`, 'success');
};
