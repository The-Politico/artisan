import store from '../../store';
import generateIllustration
  from '../../actions/illustrations/generateIllustration';
import getEtag from '../../utils/fs/getEtag';
import ids from '../../utils/ids';

/**
 * Writes an AI file to S3 and updates the project's version, then
 *  refreshes the store
 *
 * @async
 * @function
 * @param {Object} options - The options for writing an AI file.
 * @param {string} options.projectSlug - The slug of the project.
 * @param {string} options.illustrationSlug - The slug of the illustration.
 * @returns {Promise<void>} - A Promise that resolves when the AI file is
 * written and the store is updated.
 */
export default async function onWriteAI({
  projectName,
  illustrationName,
  filepath,
}) {
  const id = ids.generate({
    project: projectName,
    illustration: illustrationName,
  });

  const illoDetails = await store.illustrations.get(id);
  const { lastGeneratedVersion } = illoDetails;
  const latestVersion = await getEtag(filepath);

  if (lastGeneratedVersion !== latestVersion) {
    await generateIllustration(id);
  }
}
