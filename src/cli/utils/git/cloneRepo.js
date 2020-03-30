import git from 'simple-git';

import { PROJECTS_PATH } from 'CLI/constants/locations';

export default async(repoName, projectName) => {
  return new Promise((resolve, reject) => {
    try {
      git(PROJECTS_PATH)
        .clone(repoName, projectName)
        .exec(() => {
          resolve();
        });
    } catch (e) {
      reject(e);
    }
  });
};
