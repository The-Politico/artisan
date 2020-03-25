import git from 'simple-git';
import github from './github';
import getActiveDirectory from '../getActiveDirectory';

export default async(dir, repoName) => {
  if (!dir) {
    dir = await getActiveDirectory();
  }

  try {
    await github.repos.createInOrg({
      org: 'The-Politico',
      name: repoName,
      private: true,
    });
  } catch (e) {
    if (e.status === 422) {
      throw new Error('There already exists a repo with that name. Please try again with a new name.');
    } else {
      throw e;
    }
  }

  return new Promise((resolve, reject) => {
    try {
      git(dir)
        .init()
        .add('./*')
        .commit('initial')
        .addRemote('origin', `git@github.com:The-Politico/${repoName}.git`)
        .push('origin', 'master')
        .exec(() => {
          resolve();
        });
    } catch (e) {
      reject(e);
    }
  });
};
