import store from '../../store';

export default async function readIllustrationDetail(id) {
  return store.illustrations.get(id);
}
