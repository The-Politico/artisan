import idToSlugs from '../ids/idToSlugs';
import { ARCHIVE_PROJECTS_DIRECTORY } from '../../constants/paths';

export default function getIllustrationKey(id) {
  const slugs = idToSlugs(id);

  return [
    ARCHIVE_PROJECTS_DIRECTORY,
    slugs.project,
    `${slugs.illustration}.ai`,
  ].join('/');
}
