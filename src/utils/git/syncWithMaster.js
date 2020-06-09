import git from 'simple-git';

export default async(dir, repoName, message) => {
  return new Promise((resolve, reject) => {
    try {
      git(dir)
        .fetch({ '--all': true })
        .reset('hard')
        .pull('origin', 'master')
        .exec(() => {
          resolve();
        });
    } catch (e) {
      reject(e);
    }
  });
};
