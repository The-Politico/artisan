import { getProjectFolders } from '../../box';

export default async function readIllustrations() {
  try {
    const r = await getProjectFolders();
    const items = r.map(({ name }) => name);
    return items;
  } catch (error) {
    return [];
  }
}
