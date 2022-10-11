import { Store } from 'tauri-plugin-store-api';

/**
 * Use to access the settings store instance and its methods
 * @type {Store}
 */
export const store = new Store('.artisan-settings');

/**
 * Use to access the projects store instance and its methods
 * @type {Store}
 */
export const projects = new Store('.artisan-projects');
