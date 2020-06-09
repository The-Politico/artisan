import toStartCase from 'lodash/startCase';
import keys from 'lodash/keys';
import github from './github';
import { readConf } from '../conf';

export default async() => {
  const last100 = await github.repos.listForAuthenticatedUser({
    affiliation: 'organization_member',
    per_page: 100,
    sort: 'updated',
  });

  const conf = await readConf();

  const allDownloadedProjects = keys(conf.projects).map(
    projectName => conf.projects[projectName].repo
  );

  return last100.data
    .filter(
      d => d.name.startsWith('illustration_')
    )
    .map(
      i => {
        if (allDownloadedProjects.indexOf(i.name) === -1) {
          return {
            name: toStartCase(i.name.split('illustration_')[1]),
            value: i.full_name,
          };
        } else {
          return {
            name: toStartCase(i.name.split('illustration_')[1]) + ' (Already downloaded)',
            value: i.full_name,
          };
        }
      }
    );
};
