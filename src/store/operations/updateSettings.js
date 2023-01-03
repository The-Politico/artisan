import { STORE } from '../init';
import {
  AUTHOR_NAME,
  AUTHOR_EMAIL,
  WORKING_DIRECTORY,
  PREFERRED_PORT,
  FIRST_RUN,
} from '../constants';

/**
 * Updates Artisan settings for user's Name, Email and the Projects Folder
 * @param {Object} settings
 * @param {String} [settings.authorName] First and last name
 * @param {String} [settings.authorEmail] \@politico.com email address
 * @param {String} [settings.workingDir] Folder where Artisan projects will
 * be stored. Defaults to `$HOME/Artisan/Projects`
 * @param {String} [settings.preferredPort] Port to use for preview servers.
 * @returns
 */
export default async function updateSettings({
  firstRun,
  authorName,
  authorEmail,
  workingDir,
  preferredPort,
} = {}) {
  if (authorName) {
    await STORE.set(AUTHOR_NAME, authorName);
  }

  if (authorEmail) {
    await STORE.set(AUTHOR_EMAIL, authorEmail);
  }

  if (workingDir) {
    await STORE.set(WORKING_DIRECTORY, workingDir);
  }

  if (preferredPort) {
    await STORE.set(PREFERRED_PORT, preferredPort);
  }

  if (firstRun) {
    await STORE.set(FIRST_RUN, firstRun);
  }

  await STORE.save();
}
