import { Store } from 'tauri-plugin-store-api';

/**
 * Use to access the base store instance and its methods
 * @returns {Store}
 */
export function initStore() {
  const store = new Store('.artisan-settings');

  return store;
}
