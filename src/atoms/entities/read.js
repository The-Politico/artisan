import { flatten } from 'lodash';
import fetchProjectsArchive from '../../utils/archive/fetchProjectsArchive';

export default async function onReadEntities() {
  const archive = await fetchProjectsArchive();

  return [
    ...archive.map(({ id }) => id),
    ...flatten(
      archive.map(
        ({ illustrations }) => illustrations.map(
          ({ id }) => id,
        ),
      ),
    ),
  ];
}
