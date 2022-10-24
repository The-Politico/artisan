import {
  STAGING_URL,
  TESTING_LOCATION,
  SHARE_SUFFIX,
} from '../constants/buckets';

export default function getSharePage(projectSlug) {
  return `${STAGING_URL + TESTING_LOCATION}/${projectSlug}/${SHARE_SUFFIX}/index.html`;
}
