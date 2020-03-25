import { getActiveDirectory } from 'CLI/utils/conf';
import exec from 'CLI/utils/exec';

export default async() => {
  const dir = await getActiveDirectory();

  if (!dir) {
    return;
  }

  await exec(`atom "${dir}"`);
};
