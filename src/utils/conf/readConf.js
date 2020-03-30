import fs from 'fs-extra';

import { CONFIG_PATH } from 'Constants/locations';

export default () => {
  return fs.readJson(CONFIG_PATH);
};
