import { AWS_STAGING_BASE_URL } from '../../constants/aws';
import {
  PUBLISH_SHARE_PATH,
} from '../../constants/paths';
import idToSlugs from '../ids/idToSlugs';

export default function getIllustrationSharePath(
  id,
  { asUrl = false } = {},
) {
  const slugs = idToSlugs(id);

  const key = [
    PUBLISH_SHARE_PATH,
    slugs.project,
    slugs.illustration,
    'index.html',
  ].join('/');

  if (!asUrl) {
    return key;
  }

  return `${AWS_STAGING_BASE_URL}${key}`;
}
