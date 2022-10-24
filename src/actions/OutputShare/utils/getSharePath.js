import { TESTING_LOCATION, SHARE_SUFFIX } from '../../../constants/buckets';

export default function getSharePath(projectSlug) {
  return `${[TESTING_LOCATION]}/${[projectSlug]}/${SHARE_SUFFIX}/`;
}
