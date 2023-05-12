import getIllustrationSharePath from '../paths/getIllustrationSharePath';
import idToSlugs from '../ids/idToSlugs';
import { SHARE_PAGE_STYLES, SHARE_PAGE_SCRIPTS } from '../../constants/paths';
import { AWS_STAGING_BUCKET } from '../../constants/aws';
import s3 from '../s3';

export default async function shareIllustration(id) {
  const slugs = idToSlugs(id);
  const shareKey = getIllustrationSharePath(id);
  const shareUrl = getIllustrationSharePath(id, { asUrl: true });

  /* <Temporary> */
  const sharePageHTML = `<!DOCTYPE html>
      <html>
      <head>
      <title>${slugs.project} | ${slugs.illustration}</title>
      <link rel="stylesheet" href="https://www.politico.com/${SHARE_PAGE_STYLES}"></link>
      </head>
      <body>
        <p>Hello World!</p>
        <p>${shareUrl}</p>
        <script src="https://www.politico.com/${SHARE_PAGE_SCRIPTS}"></script>
        <script>
          initSharePage({
            // Config goes here
            slug: "Hello World"
          });
        </script>
      </body>
      </html>`;
  /* </Temporary> */

  await s3.upload({
    bucket: AWS_STAGING_BUCKET,
    key: shareKey,
    body: sharePageHTML,
    contentType: 'text/html',
  });
}
