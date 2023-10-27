import getProjectSharePath from '../../utils/paths/getProjectSharePath';
import {
  SHARE_PAGE_STYLES,
  SHARE_PAGE_SCRIPTS,
  SHARE_PAGE_ASSETS,
  PUBLISH_EMBED_PATH,
} from '../../constants/paths';
import { AWS_STAGING_BUCKET } from '../../constants/aws';
import s3 from '../../utils/s3';
import getIllosInProject from '../../utils/store/getIllosInProject';
import ids from '../../utils/ids';
import publishIllustration from '../illustrations/publishIllustration';

export default async function shareProject(projectId) {
  const shareKey = getProjectSharePath(projectId);

  const illustrations = await getIllosInProject(projectId);
  const illoIds = illustrations.map(([id]) => ids.parse(id).illustration);

  const config = {
    projectId,
    embedUrl: PUBLISH_EMBED_PATH,
    illos: illoIds,
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
      <link rel="icon" type="image/svg+xml" href="/${SHARE_PAGE_ASSETS}/favicon.svg">
      <link rel="icon" type="image/x-icon" href="/${SHARE_PAGE_ASSETS}/favicon.ico">
      </head>
      <body>
        <div id="root"></div>
        <script src="/${SHARE_PAGE_SCRIPTS}"></script>
        <script>
          initSharePage(${JSON.stringify(config)});
        </script>
      </body>
      </html>`;

  await Promise.all(illustrations.map(
    async ([illoId]) => {
      await publishIllustration(illoId, { staging: true });
    },
  ));

  await s3.upload({
    bucket: AWS_STAGING_BUCKET,
    key: shareKey,
    body: sharePageHTML,
    contentType: 'text/html',
  });
}
