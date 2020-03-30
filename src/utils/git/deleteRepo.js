import github from './github';
import { getActiveDirectory } from '../conf';
import { log } from '../console';

export default async(dir, repoName) => {
  if (!dir) {
    dir = await getActiveDirectory();
  }

  if (repoName.startsWith('illustration_')) {
    return github.repos.delete({
      org: 'The-Politico',
      name: repoName,
    });
  } else {
    log('Only repos beginning with "illustration_" can be deleted by this app', 'error');
  }
};
