import fetchProjectsArchive from '../../../utils/archive/fetchProjectsArchive';
import { ENTITIES } from '../../../store/init';

export default async function onReadProject(projectId) {
  const projectInLocal = await ENTITIES.get(projectId);
  if (projectInLocal) {
    return {
      ...projectInLocal,
      lastUploaded: null,
      lastPublished: null,
    };
  }

  const archive = await fetchProjectsArchive();
  const projectInArchive = archive.find(({ id }) => projectId === id);
  if (projectInArchive) {
    return {
      ...projectInArchive,
      type: 'project',
      lastUpdated: null,
      lastPublished: null,
    };
  }

  throw new Error(`Project not found: ${projectId}`);
}
