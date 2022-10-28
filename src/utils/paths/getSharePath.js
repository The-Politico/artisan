import { AWS_STAGING_BASE_URL } from '../../constants/aws';
import {
  PUBLISH_SHARE_PATH,
} from '../../constants/paths';

export default function getSharePath(
  projectSlug,
  { asUrl = false } = {},
) {
  const key = `${PUBLISH_SHARE_PATH}/${projectSlug}/index.html`;

  if (!asUrl) {
    return key;
  }

  return `${AWS_STAGING_BASE_URL}${key}`;
}
