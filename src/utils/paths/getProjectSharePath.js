import { AWS_STAGING_BASE_URL } from '../../constants/aws';
import {
  PUBLISH_SHARE_PATH,
} from '../../constants/paths';

export default function getProjectSharePath(
  id,
  { asUrl = false } = {},
) {
  const key = [
    PUBLISH_SHARE_PATH,
    id,
    'index.html',
  ].join('/');

  if (!asUrl) {
    return key;
  }

  return `${AWS_STAGING_BASE_URL}${key}`;
}
