import generateIllustration
  from '../../utils/illustrations/generateIllustration';
import getProjectInfoFromSlug from '../../utils/store/getProjectInfoFromSlug';
import getIlloInfoFromSlug from '../../utils/store/getIlloInfoFromSlug';
import backupIllustration from '../../utils/illustrations/backupIllustration';

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
export default async function onWriteAI({ projectSlug, illustrationSlug }) {
  const projectInfo = await getProjectInfoFromSlug(projectSlug);
  const illoInfo = await getIlloInfoFromSlug(illustrationSlug, projectInfo.id);

  // Generate illustrations
  await generateIllustration(illoInfo.id);

  // Upload illustration
  await backupIllustration(illoInfo.id, { force: false });
}
