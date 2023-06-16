import { getProjectFolders } from '../../utils/box';

export default async function readIllustrations() {
  try {
    const r = await getProjectFolders();
    const items = r.entries.map(({ name }) => name);
    return items;
  } catch (error) {
    console.log(error);
    return [];
  }
}
