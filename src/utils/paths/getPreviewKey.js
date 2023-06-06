import ids from '../ids';
import { ARCHIVE_PROJECTS_DIRECTORY } from '../../constants/paths';

export default function getPreviewKey(id) {
  const {
    project,
    illustration,
  } = ids.parse(id);

  return [
    ARCHIVE_PROJECTS_DIRECTORY,
    project,
    `${illustration}.png`,
  ].join('/');
}
