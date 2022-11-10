import { AWS_STAGING_BUCKET } from '../constants/aws';

import s3 from '../utils/s3';
import getSharePath from '../utils/paths/getSharePath';

export default async function outputShare(projectSlug) {
  const shareKey = getSharePath(projectSlug);

  /* <Temporary> */
  const shareURL = getSharePath(projectSlug, { asUrl: true });
  const sharePageHTML = `<!DOCTYPE html>
      <html>
      <head>
      <title>${projectSlug}</title>
      </head>
      <body>
      <p>Hello World!</p>
      <p>${shareURL}</p>
      </body>
      </html>`;
  /* </Temporary> */

  await s3.upload({
    bucket: AWS_STAGING_BUCKET,
    key: shareKey,
    body: sharePageHTML,
    contentType: 'text/html ',
  });
}
