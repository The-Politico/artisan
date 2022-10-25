import { writeTextFile, readBinaryFile } from '@tauri-apps/api/fs';
import { join } from '@tauri-apps/api/path';
import getSharePath from './utils/getSharePath';
import {
  AWS_STAGING_BUCKET,
  STAGING_URL,
  PROJECTS_FOLDER,
} from '../../constants/buckets';
import uploadS3Object from './utils/upload-to-s3';

import getIlloPaths from './utils/getIlloPaths';
import getFallbackPaths from './utils/getFallbackPaths';

export default async function OutputShare(projectSlug) {
  const illos = await getIlloPaths(projectSlug);

  const projectFallbacks = [];

  await Promise.all(illos.map(async (illo) => {
    const fallbacks = await getFallbackPaths(illo);
    projectFallbacks.push(...fallbacks);
  }));

  await Promise.all(projectFallbacks.map(async (projectFallback) => {
    const imageContent = await readBinaryFile(projectFallback);
    const splitFallbackPath = projectFallback.split('/ai2html-output/');

    const imageFile = splitFallbackPath[1];
    const illoSlug = splitFallbackPath[0].split(`/${projectSlug}/`)[1];

    const imageDestKey = `${getSharePath(projectSlug) + illoSlug}/${imageFile}`;
    await uploadS3Object(AWS_STAGING_BUCKET, imageDestKey, imageContent);
  }));

  const shareKey = `${getSharePath(projectSlug)}index.html`;
  const shareURL = STAGING_URL + shareKey;

  const sharePageHTML = `<!DOCTYPE html>
      <html>
      <head>
      <title>${projectSlug}</title>
      </head>
      <body>
      <p>Hello World! ${shareURL}</p>
      </body>
      </html>`;

  // we don't really need a local file in the future
  // For now, helpful while we build out
  // what share page needs to look like.

  const fileName = 'share.html';
  const destination = await join(
    PROJECTS_FOLDER,
    projectSlug,
    fileName,
  );
  await writeTextFile(destination, sharePageHTML);

  await uploadS3Object(AWS_STAGING_BUCKET, shareKey, sharePageHTML);
}
