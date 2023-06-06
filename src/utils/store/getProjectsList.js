import store from '../../store';
import ids from '../ids';

export default async function getProjectsList() {
  const illustrationEntries = await store.illustrations.get();

  const projectSet = illustrationEntries.reduce((acc, entry) => {
    const [id] = entry;
    const { project: projectId } = ids.parse(id);
    acc.add(projectId);
    return acc;
  }, new Set());

  return Array.from(projectSet);
}
