import { STORE } from '../init';
import {
  AUTHOR_NAME,
  AUTHOR_EMAIL,
  WORKING_DIRECTORY,
  PREFERRED_PORT,
} from '../constants';

export default async function getSettings() {
  const authorName = await STORE.get(AUTHOR_NAME);
  const authorEmail = await STORE.get(AUTHOR_EMAIL);
  const workingDir = await STORE.get(WORKING_DIRECTORY);
  const preferredPort = await STORE.get(PREFERRED_PORT);
  const firstRun = await STORE.get('first-run');

  return {
    firstRun,
    authorName,
    authorEmail,
    workingDir,
    preferredPort,
  };
}
