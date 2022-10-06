import { store } from './init';

/**
 * Updates Artisan settings for user's Name, Email and the Projects Folder
 * @param {Object} settings
 * @param {String} [settings.authorName] First and last name
 * @param {String} [settings.authorEmail] \@politico.com email address
 * @param {String} [settings.projectsFolder] Folder where Artisan projects will
 * be stored. Defaults to `$HOME/Artisan/Projects`
 * @returns
 */
export async function updateAppSettings({
  authorName,
  authorEmail,
  projectsFolder,
}) {
  await store.set('authorName', authorName);
  await store.set('authorEmail', authorEmail);
  await store.set('projectsFolder', projectsFolder);

  await store.save();
}
