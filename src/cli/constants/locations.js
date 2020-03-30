import path from 'path';
import os from 'os';

export const INSTALL_DIRECTORY = path.resolve(__dirname, '../install');
export const STATE_PATH = path.join(os.homedir(), `.artisan`);
export const CONFIG_PATH = path.join(STATE_PATH, `config.json`);
export const PROJECTS_PATH = path.join(STATE_PATH, 'projects');
