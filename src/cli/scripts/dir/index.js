import { STATE_PATH } from 'CLI/constants/locations';

import exec from 'CLI/utils/exec';

export default async() => {
  await exec(`open ${STATE_PATH}`);
};
