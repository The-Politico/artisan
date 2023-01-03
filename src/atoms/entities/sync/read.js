import { flatten, uniq } from 'lodash';
import fetchProjectsArchive from '../../../utils/archive/fetchProjectsArchive';
import { ENTITIES } from '../../../store/init';

export default async function onReadEntities() {
  const archive = await fetchProjectsArchive();
  const local = await ENTITIES.values();

  return uniq([
    ...archive.map(({ id }) => id),
    ...flatten(
      archive.map(
        ({ illustrations }) => illustrations.map(
          ({ id }) => id,
        ),
      ),
    ),
    ...local.map(({ id }) => id),
  ]);
}
