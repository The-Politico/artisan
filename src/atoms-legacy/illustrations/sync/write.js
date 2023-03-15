import { ENTITIES } from '../../../store/init';

export default async function onWriteIllustration(value, illoId) {
  await ENTITIES.set(illoId, {
    type: 'illustration',
    id: illoId,
    slug: value.slug,
    name: value.name,
    project: value.project,
  });
}
