import getProjectSharePath from '../../utils/paths/getProjectSharePath';
import ids from '../../utils/ids';
import {
  SHARE_PAGE_STYLES,
  SHARE_PAGE_SCRIPTS,
  PUBLISH_EMBED_PATH,
} from '../../constants/paths';
import { AWS_STAGING_BUCKET } from '../../constants/aws';
import s3 from '../../utils/s3';
import store from '../../store';

export default async function shareProject(id) {
  const {
    project: projectName,
  } = ids.gen(id);

  const shareKey = getProjectSharePath(id);

  // TODO: I think we have to do something with this
  // const shareUrl = getProjectSharePath(id, { asUrl: true });
  const illustrationIds = await store.illustrations.get();
  const illustrations = illustrationIds
    .filter(([, data]) => data.project === projectName)
    .map(([entryId, data]) => ({
      id: entryId,
      name: projectName,
      slug: data.slug,
    }));

  const config = {
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
    contentType: 'text/html',
  });
}
