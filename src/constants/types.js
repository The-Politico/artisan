import {
  array,
  string,
  object,
  stringLiterals,
  jsonDate,
  nullable,
  number,
  dict,
  voidable,
} from '@recoiljs/refine';
import { ALL_STATUSES } from './statuses';

// The name of a valid store
export const TYPE_STORE_NAME = stringLiterals({
  settings: 'settings',
  illustrations: 'illustrations',
  preview: 'preview',
  auth: 'auth',
});

// A collection of illustration IDs
export const TYPE_ILLUSTRATION_ID_COLLECTION = array(string());

export const TYPE_ILLUSTRATION_STORE_ITEM = object({
  // The last version known to have been generated
  lastGeneratedVersion: nullable(string()),

  // The last time the illustration was generated
  lastGeneratedDate: nullable(jsonDate()),

  // The last time the illustration was published
  lastPublishedDate: nullable(jsonDate()),
});

export const TYPE_ILLUSTRATION_STORE = dict(TYPE_ILLUSTRATION_STORE_ITEM);

// Valid options for the settings store
export const TYPE_SETTINGS_STORE_KEYS = {
  'working-directory': string(),
  'preferred-port': string(),
  'aws-id': string(),
  'aws-secret': string(),
  stream_pos: string(),
  box_tokens: voidable(object({
    access_token: voidable(string()), // These are voidable just for testing
    refresh_token: voidable(string()),
  })),
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

export const TYPE_AUTH_STORE_KEYS = {
  box_tokens: voidable(object({
    access_token: voidable(string()), // These are voidable just for testing
    refresh_token: voidable(string()),
  })),
  username: string(),
  user_id: string(),
};

export const TYPE_AUTH_STORE = object(TYPE_AUTH_STORE_KEYS);

// Valid status type for projects and illustrations
export const TYPE_ENTITY_STATUS = stringLiterals(
  Array.from(ALL_STATUSES).reduce((acc, status) => {
    acc[status] = status;
    return acc;
  }, {}),
);
