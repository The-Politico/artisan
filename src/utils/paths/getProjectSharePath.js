import { AWS_STAGING_BASE_URL } from '../../constants/aws';
import {
  PUBLISH_SHARE_PATH,
} from '../../constants/paths';
import slugify from '../text/slugify';

export default function getProjectSharePath(
  id,
  { asUrl = false } = {},
) {
  const projectSlug = slugify(id);

  const key = [
    PUBLISH_SHARE_PATH,
    projectSlug,
    'index.html',
  ].join('/');

  if (!asUrl) {
    return key;
  }

  return `${AWS_STAGING_BASE_URL}${key}`;
}
