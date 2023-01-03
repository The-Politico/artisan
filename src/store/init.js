import { Store } from 'tauri-plugin-store-api';
import {
  BASE_STORE_NAME,
  PROJECTS_STORE_NAME,
} from './constants';

/**
 * Use to access the settings store instance and its methods
 * @type {Store}
 */
export const STORE = new Store(BASE_STORE_NAME);

/**
 * Use to access the projects store instance and its methods
 * @type {Store}
 */
export const PROJECTS = new Store(PROJECTS_STORE_NAME);

export const ENTITIES = new Store('.artisan-entities');
