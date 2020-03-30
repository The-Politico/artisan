import fs from 'fs-extra';

import { CONFIG_PATH } from 'CLI/constants/locations';

export default () => {
  return fs.readJson(CONFIG_PATH);
};
