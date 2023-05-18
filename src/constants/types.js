import {
  array,
  string,
  object,
  bool,
  stringLiterals,
  jsonDate,
  nullable,
  number,
  or,
  dict,
} from '@recoiljs/refine';
import { ALL_STATUSES } from './statuses';

// The name of a valid store
export const TYPE_STORE_NAME = stringLiterals({
  settings: 'settings',
  entities: 'entities',
  preview: 'preview',
});

// A collection of entity IDs
export const TYPE_ENTITY_ID_COLLECTION = array(string());


export const TYPE_ILLUSTRATION_STORE_ITEM = object({
  slug: string(),
  project: string(),

  // The last known version to be generated
  version: nullable(string()),

  // The version available in the archive
  cloudVersion: nullable(string()),

  // The last known version to be backed up
  lastUploadedVersion: nullable(string()),

  // The last time the file was changed
  lastUpdated: jsonDate(),

  // The last time the file was backed up
  lastUploadedDate: nullable(jsonDate()),

  // The last time the file was published live
  lastPublishedDate: nullable(jsonDate()),
});

export const TYPE_ENTITY_STORE_ITEM = or(
  TYPE_PROJECT_STORE_ITEM,
  TYPE_ILLUSTRATION_STORE_ITEM,
);

export const TYPE_ENTITY_STORE = dict(TYPE_ENTITY_STORE_ITEM);

// Valid options for the settings store
export const TYPE_SETTINGS_STORE_KEYS = {
  'author-email': string(),
  'author-name': string(),
  'working-directory': string(),
  'preferred-port': string(),
  'first-run': bool(),
};

// Valid object containing all the settings for a complete store
export const TYPE_SETTINGS_STORE = object(TYPE_SETTINGS_STORE_KEYS);

// Valid options for a preview
export const TYPE_PREVIEW_STORE_KEYS = {
  process: nullable(number()),
  project: nullable(string()),
};

// Valid object containing all the values for a complete preview
export const TYPE_PREVIEW_STORE = object(TYPE_PREVIEW_STORE_KEYS);

// Valid status type for projects and illustrations
export const TYPE_ENTITY_STATUS = stringLiterals(
  Array.from(ALL_STATUSES).reduce((acc, status) => {
    acc[status] = status;
    return acc;
  }, {}),
);
