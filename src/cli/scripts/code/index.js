import { getActiveDirectory } from 'CLI/utils/conf/index.js';
import exec from 'CLI/utils/exec';

export default async() => {
  const dir = await getActiveDirectory();

  if (!dir) {
    return;
  }

  await exec(`atom "${dir}"`, 'root');
};
