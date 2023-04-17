import store from '../../store';
import fetchPreviews from '../../utils/archive/fetchPreviews';

export default async function s3SyncInterval() {
  const syncs = () => {
    fetchPreviews();
    store.entities.refresh();
  };

  syncs();

  // Delay to offset fs interval
  await new Promise((resolve) => {
    setTimeout(() => resolve, 10 * 1000);
  });

  setInterval(syncs, 60 * 1000);
}
