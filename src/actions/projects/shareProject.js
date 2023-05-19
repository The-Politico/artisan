import getProjectSharePath from '../../utils/paths/getProjectSharePath';
import idToSlugs from '../../utils/ids/idToSlugs';
import titleify from '../../utils/text/titleify';
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
    project: projectSlug,
  } = idToSlugs(id);

  const shareKey = getProjectSharePath(id);
  const projectName = titleify(projectSlug);

  // TODO: I think we have to do something with this
  // const shareUrl = getProjectSharePath(id, { asUrl: true });
  const entities = await store.entities.get();
  const illustrations = entities
    .filter(([, data]) => data.project === projectSlug)
    .map(([entryId, data]) => ({
      id: entryId,
      name: titleify(data.slug),
      slug: data.slug,
    }));

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
    contentType: 'text/html',
  });
}
