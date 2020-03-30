import git from 'simple-git';

export default async(dir, repoName, message) => {
  return new Promise((resolve, reject) => {
    try {
      git(dir)
        .init()
        .add('./*')
        .commit(message)
        .push('origin', 'master')
        .exec(() => {
          resolve();
        });
    } catch (e) {
      reject(e);
    }
  });
};
