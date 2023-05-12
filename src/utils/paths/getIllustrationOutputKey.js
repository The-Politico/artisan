import { PUBLISH_EMBED_PATH } from '../../constants/paths';
import idToSlugs from '../ids/idToSlugs';

export default function getIllustrationOutputKey(id) {
  const slugs = idToSlugs(id);

  return [
    PUBLISH_EMBED_PATH,
    slugs.project,
    slugs.illustration,
  ].join('/');
}
