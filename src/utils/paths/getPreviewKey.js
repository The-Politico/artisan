import idToSlugs from '../ids/idToSlugs';
import { ARCHIVE_PROJECTS_DIRECTORY } from '../../constants/paths';

export default function getPreviewKey(id) {
  const slugs = idToSlugs(id);

  return `${ARCHIVE_PROJECTS_DIRECTORY}/${slugs.project}/${slugs.illustration}.png`;
}
