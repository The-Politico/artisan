import { AWS_STAGING_BUCKET } from '../constants/aws';
import { SHARE_PAGE_SCRIPTS, SHARE_PAGE_STYLES } from '../constants/paths';

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
      <link rel="stylesheet" href="https://www.politico.com/${SHARE_PAGE_STYLES}"></link>
      </head>
      <body>
        <p>Hello World!</p>
        <p>${shareURL}</p>
        <script src="https://www.politico.com/${SHARE_PAGE_SCRIPTS}"></script>
        <script>
          initSharePage({
            // Config goes here
            slug: "${projectSlug}"
          });
        </script>
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
