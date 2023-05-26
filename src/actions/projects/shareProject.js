import getProjectSharePath from '../../utils/paths/getProjectSharePath';
import {
  SHARE_PAGE_STYLES,
  SHARE_PAGE_SCRIPTS,
  PUBLISH_EMBED_PATH,
} from '../../constants/paths';
import { AWS_STAGING_BUCKET } from '../../constants/aws';
import s3 from '../../utils/s3';
import store from '../../store';

export default async function shareProject(projectId) {
  const shareKey = getProjectSharePath(projectId);

  const illustrationIds = await store.illustrations.get();
  const illustrations = illustrationIds
    .filter(([, data]) => data.project === projectId)
    .map(([, data]) => data.slug);

  const config = {
    projectId,
    embedUrl: PUBLISH_EMBED_PATH,
    illos: illustrations,
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
      <title>${projectId} | Artisan Share Page</title>
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
    contentType: 'text/html',
  });
}
