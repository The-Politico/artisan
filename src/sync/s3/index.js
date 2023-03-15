import store from '../../store';

export default function s3Sync() {
  setInterval(() => {
    // TO DO
    store.entities.refresh();
  }, 5000);
}
