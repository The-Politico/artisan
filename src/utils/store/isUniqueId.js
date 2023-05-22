import { stringLiterals, assertion } from '@recoiljs/refine';
import getProjectsList from './getProjectsList';
import getIllosInProject from './getIllosInProject';

const UNIQUE_LEVEL_PROJECT = 'project';
const UNIQUE_LEVEL_ILLUSTRATION = 'illustration';
const UNIQUE_LEVEL_TYPE = stringLiterals({
  [UNIQUE_LEVEL_PROJECT]: UNIQUE_LEVEL_PROJECT,
  [UNIQUE_LEVEL_ILLUSTRATION]: UNIQUE_LEVEL_ILLUSTRATION,
});

export default async function isUniqueId({
  project: projectName,
  illustration: illoName,
  unique,
}) {
  // Derive defaults and check types
  let uniqueLevel = unique;
  if (!uniqueLevel) {
    if (!!projectName && !!illoName) {
      uniqueLevel = UNIQUE_LEVEL_ILLUSTRATION;
    } else if (projectName) {
      uniqueLevel = UNIQUE_LEVEL_PROJECT;
    }
  }
  assertion(UNIQUE_LEVEL_TYPE)(uniqueLevel);

  // Derive uniqueness
  switch (uniqueLevel) {
    case UNIQUE_LEVEL_PROJECT: {
      const projects = await getProjectsList();
      return projects.indexOf(projectName) === -1;
    }

    case UNIQUE_LEVEL_ILLUSTRATION: {
      const illustrationsInProject = await getIllosInProject(projectName);
      return illustrationsInProject.indexOf(illoName) === -1;
    }

    default:
      return false;
  }
}
