import urlJoin from 'url-join';
import { join } from '@tauri-apps/api/path';
import { readBinaryFile } from '@tauri-apps/api/fs';
import { v4 as uuidv4 } from 'uuid';
import versionize from '../../utils/text/versionize';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import {
  ARCHIVE_PROJECTS_DIRECTORY,
} from '../../constants/paths';
import s3 from '../../utils/s3';
import generateIllustration
  from '../../utils/illustrations/generateIllustration';
import getProjectInfoFromSlug from '../../utils/store/getProjectInfoFromSlug';
import store from '../../store';
import titleify from '../../utils/text/titleify';
import getIlloInfoFromSlug from '../../utils/store/getIlloInfoFromSlug';

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
  await generateIllustration(projectSlug, illustrationSlug);

  // Update version number
  const version = versionize();
  await s3.upload({
    bucket: AWS_ARTISAN_BUCKET,
    body: projectInfo.name,
    key: `${urlJoin(ARCHIVE_PROJECTS_DIRECTORY, projectSlug)}/`,
    contentType: 'application/x-directory',
    metadata: {
      id: projectInfo.id,
      name: projectInfo.name,
      version,
    },
  });

  // Upload illustration
  const workingDirectory = await store.settings.get('working-directory');
  const filePath = await join(workingDirectory, projectSlug, illustrationSlug, `${illustrationSlug}.ai`);
  const content = await readBinaryFile(filePath);

  const keyPath = await join(
    ARCHIVE_PROJECTS_DIRECTORY,
    projectSlug,
    `${illustrationSlug}.ai`,
  );

  await s3.upload({
    bucket: AWS_ARTISAN_BUCKET,
    body: content,
    key: keyPath,
    storageClass: 'STANDARD',
    metadata: {
      id: illoInfo?.id || `I-${uuidv4()}`,
      name: titleify(illustrationSlug),
    },
  });

  await store.entities.refresh();
}
