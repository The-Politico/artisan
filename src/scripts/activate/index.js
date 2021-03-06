import { log } from 'Utils/console.js';
import selectProject from 'Utils/selectProject';
import { updateConf, getProjects, getActiveProject, isActiveProject } from 'Utils/conf/index.js';

export default async(opts = {}) => {
  const allProjects = await getProjects();
  const isProject = await isActiveProject();

  let activeProject;
  if (isProject) {
    activeProject = await getActiveProject();
  }

  const allProjectsNotActive = allProjects
    .filter(
      p => activeProject ?
        activeProject.name !== p :
        true
    );

  const project = await selectProject(opts.project, allProjectsNotActive, {
    noneAvailable: 'No projects available to activate.',
    question: 'Which project would you like to activate?',
    doesNotExist: p => `Project "${p}" does not exist or is archived.`,
  });

  if (!project) {
    return;
  }

  await updateConf({ active: project });
  log(`"${project}" is now the active project.`, 'success');
};
