import store from '../../store';

export default async function readIllustrations() {
  const entities = await store.illustrations.get();
  return entities.map(([id]) => id);
}
