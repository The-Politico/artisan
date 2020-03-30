import { gacm } from 'Utils/git/index';
import { getActiveProject } from 'Utils/conf/index';
import { log } from 'Utils/console';

export default async({ message }) => {
  if (!message) {
    message = (new Date()).toISOString();
  }

  const project = await getActiveProject();
  if (!project) {
    return;
  }

  try {
    await gacm(project.path, project.repo, message);
  } catch (e) {
    log('Something went wrong saving your project to GitHub', 'error');
    log(e);
    return;
  }

  log('Your project has been saved on GitHub succesffully.', 'success');
};
