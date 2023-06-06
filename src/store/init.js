import { Store } from 'tauri-plugin-store-api';

/**
 * Use to access the settings store instance and its methods
 * @type {Store}
 */
export const SETTINGS = new Store('.settings');

/**
 * Use to access the illustrations store instance and its methods
 * @type {Store}
 */
export const ILLUSTRATIONS = new Store('.illustrations');

/**
 * Use to access the preview store instance and its methods
 * @type {Store}
 */
export const PREVIEW = new Store('.preview');

/**
 * Interface to access store via unique key
 * @type {Object}
 */
export const MAP = {
  settings: SETTINGS,
  illustrations: ILLUSTRATIONS,
  preview: PREVIEW,
};
