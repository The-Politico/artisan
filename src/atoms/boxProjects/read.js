import { getProjectFolders } from '../../utils/box';

export default async function readIllustrations() {
  const r = await getProjectFolders();
  const items = Object.entries(r.entries).map((_, { name }) => name);
  return items;
}
