import { Store } from 'tauri-plugin-store-api';

export function initStore() {
  const store = new Store('.artisan-settings');

  return store;
}
