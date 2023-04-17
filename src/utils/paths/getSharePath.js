import { AWS_STAGING_BASE_URL } from '../../constants/aws';
import {
  PUBLISH_SHARE_PATH,
} from '../../constants/paths';

/**
 * Returns the share path for a given project slug based
 *  on the specified options.
 *
 * @param {string} projectSlug - The slug identifier for the project.
 * @param {Object} [options] - Options to configure returned share path.
 * @param {boolean} [options.asUrl=false] - Whether to return the
 *  path as a URL or not.
 *
 * @returns {string} - The computed share path, either as a key or a full URL.
 */
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
