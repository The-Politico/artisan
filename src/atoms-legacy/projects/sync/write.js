import { ENTITIES } from '../../../store/init';

export default async function onWriteProject(value, projectId) {
  await ENTITIES.set(projectId, {
    type: 'project',
    id: projectId,
    name: value.name,
    slug: value.slug,
    version: value.version,
    lastUpdated: new Date().toISOString(),
  });
}
