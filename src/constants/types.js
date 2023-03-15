import {
  array,
  string,
  object,
  bool,
  voidable,
  stringLiterals,
  jsonDate,
  nullable,
  number,
} from '@recoiljs/refine';

// The name of a valid store
export const TYPE_STORE_NAME = stringLiterals({
  settings: 'settings',
  entities: 'entities',
  preview: 'preview',
});

// A collection of entity IDs
export const TYPE_ENTITY_ID_COLLECTION = array(string());

// A collection of data stored about an entity
export const TYPE_ENTITY_STORE_ITEM = object({
  id: string(),
  name: string(),
  slug: string(),
  version: voidable(string()),
  lastUpdated: jsonDate(),
  healthy: voidable(bool()),
  project: voidable(string()),
  publicUrl: voidable(string()),
});

// Valid options for the settings store
export const TYPE_SETTINGS_STORE_KEYS = {
  'author-email': string(),
  'author-name': string(),
  'working-directory': string(),
  'preferred-port': string(),
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
