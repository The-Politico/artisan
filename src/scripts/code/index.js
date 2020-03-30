import { getActiveDirectory } from 'Utils/conf/index.js';
import exec from 'Utils/exec';

export default async() => {
  const dir = await getActiveDirectory();

  if (!dir) {
    return;
  }

  await exec(`atom "${dir}"`, 'root');
};
