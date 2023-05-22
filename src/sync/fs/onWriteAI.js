/* eslint-disable */
import store from '../../store';
import generateIllustration
  from '../../actions/illustrations/generateIllustration';
import getProjectInfoFromSlug from '../../utils/store/getProjectInfoFromSlug';
import getIlloInfoFromSlug from '../../utils/store/getIlloInfoFromSlug';
import backupIllustration from '../../actions/illustrations/backupIllustration';
import getEtag from '../../utils/fs/getEtag';

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
  projectSlug,
  illustrationSlug,
  filepath,
}) {
  // const id = slugsToId({
  //   project: projectSlug,
  //   illustration: illustrationSlug,
  // });
  // const illoInfo = store.illustrations.get(id);
  // const etag = await getEtag(filepath);

  // await store.illustrations.set({
  //   [id]: {
  //     slug: illustrationSlug,
  //     project: projectSlug,
  //     lastUpdated: (new Date()).toISOString(),
  //     version: etag,
  //     ...(illoInfo || {}),
  //   },
  // });

  // Generate illustrations
  // await generateIllustration(illoInfo.id);

  // Upload illustration
  // await backupIllustration(illoInfo.id, { force: false });
}
