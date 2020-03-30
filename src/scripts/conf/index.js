import { CONFIG_PATH } from 'Constants/locations';

import exec from 'Utils/exec';

export default async() => {
  await exec(`atom "${CONFIG_PATH}"`, 'root');
};
