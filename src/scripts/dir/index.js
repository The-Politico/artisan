import { STATE_PATH } from 'Constants/locations';

import exec from 'Utils/exec';

export default async() => {
  await exec(`open ${STATE_PATH}`, 'root');
};
