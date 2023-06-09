import { stringLiterals, assertion } from '@recoiljs/refine';
import getProjectsList from './getProjectsList';
import getIllosInProject from './getIllosInProject';
import slugify from '../text/slugify';
import s3 from '../s3';
import { PUBLISH_SHARE_PATH } from '../../constants/paths';
import { AWS_STAGING_BUCKET } from '../../constants/aws';

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
    if (projectName && illoName) {
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
      const uniqueInStore = projects.indexOf(projectName) === -1;
      if (!uniqueInStore) {
        return false;
      }

      const projectSlug = slugify(projectName);
      const sharedProjectsResp = await s3.list({
        bucket: AWS_STAGING_BUCKET,
        prefix: PUBLISH_SHARE_PATH,
      });

      const sharedProjectSlugs = sharedProjectsResp.Contents
        .reduce((acc, obj) => {
          const objSlug = obj.Key
            .split(PUBLISH_SHARE_PATH)[1]
            .split('/')[1];
          acc.add(objSlug);
          return acc;
        }, new Set());

      const uniqueInS3 = !sharedProjectSlugs.has(projectSlug);

      if (!uniqueInS3) {
        return false;
      }

      return true;
    }

    case UNIQUE_LEVEL_ILLUSTRATION: {
      const illustrationsInProject = await getIllosInProject(projectName);
      return illustrationsInProject.indexOf(illoName) === -1;
    }

    default:
      return false;
  }
}
