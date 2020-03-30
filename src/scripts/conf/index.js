import { CONFIG_PATH } from 'CLI/constants/locations';

import exec from 'CLI/utils/exec';

export default async() => {
  await exec(`atom "${CONFIG_PATH}"`, 'root');
};
