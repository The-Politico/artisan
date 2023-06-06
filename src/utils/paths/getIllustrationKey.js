import ids from '../ids';
import { ARCHIVE_PROJECTS_DIRECTORY } from '../../constants/paths';

export default function getIllustrationKey(id) {
  const names = ids.parse(id);

  return [
    ARCHIVE_PROJECTS_DIRECTORY,
    names.project,
    `${names.illustration}.ai`,
  ].join('/');
}
