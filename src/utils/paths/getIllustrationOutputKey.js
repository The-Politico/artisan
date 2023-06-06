import { PUBLISH_EMBED_PATH } from '../../constants/paths';
import ids from '../ids';
import slugify from '../text/slugify';

export default function getIllustrationOutputKey(id) {
  const names = ids.parse(id);
  const projectSlug = slugify(names.project);
  const illoSlug = slugify(names.illustration);

  return [
    PUBLISH_EMBED_PATH,
    projectSlug,
    illoSlug,
  ].join('/');
}
