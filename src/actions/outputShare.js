import { AWS_STAGING_BUCKET } from '../constants/aws';
import {
  PUBLISH_EMBED_PATH,
  SHARE_PAGE_SCRIPTS,
  SHARE_PAGE_STYLES,
} from '../constants/paths';

import s3 from '../utils/s3';
import getSharePath from '../utils/paths/getSharePath';
import store from '../store';

export default async function outputShare(projectSlug) {
  const shareKey = getSharePath(projectSlug);

  const { name: projectName, illustrations } = await store.getProject(
    projectSlug,
  );

  const config = {
    projectSlug,
    projectName,
    embedUrl: `/${PUBLISH_EMBED_PATH}`,
    illos: illustrations.map(({ name, slug }) => ({
      name,
      slug,
    })),
  };

  const sharePageHTML = `<!DOCTYPE html>
      <html>
      <head>
      <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <meta
      http-equiv="X-UA-Compatible"
      content="ie=edge"
    />
    <link rel="stylesheet" href="https://use.typekit.net/dsx2uhv.css" />
      <title>${projectName} | Artisan Share Page</title>
      <link rel="stylesheet" href="/${SHARE_PAGE_STYLES}"></link>
      </head>
      <body>
        <div id="root"></div>
        <script src="/${SHARE_PAGE_SCRIPTS}"></script>
        <script>
          initSharePage(${JSON.stringify(config)});
        </script>
      </body>
      </html>`;

  await s3.upload({
    bucket: AWS_STAGING_BUCKET,
    key: shareKey,
    body: sharePageHTML,
    contentType: 'text/html ',
  });
}
