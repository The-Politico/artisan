/* This file is a WIP, and not actually in use anywhere yet */

import {
  string,
  object,
} from '@recoiljs/refine';

import err from '../utils/err';
import taggedTemplate from '../utils/taggedTemplate';

export const ERROR_ILLUSTRATION_CLOUD_MISMATCH = err({
  code: 'ERROR_ILLUSTRATION_CLOUD_MISMATCH',
  template: taggedTemplate`Local illustration version (${'localVersion'}) does not match uploaded cloud version (${'cloudVersion'}).`,
  explanation: 'If another user made a change to the file and uploaded it, '
    + 'you\'ll need to download the latest version before making changes.',
  params: object({
    localVersion: string(),
    cloudVersion: string(),
  }),
});

export const ERROR_ILLUSTRATION_LOCAL_MISMATCH = err({
  code: 'ERROR_ILLUSTRATION_LOCAL_MISMATCH',
  template: taggedTemplate`Local illustration version (${'localVersion'}) does not file version (${'fileVersion'}).`,
  explanation: 'If you made changes , '
  + 'you\'ll need to download the latest version before making changes.',
  params: object({
    localVersion: string(),
    fileVersion: string(),
  }),
});

// Legacy errors that will need to be converted...
// export const RESRVED_PROJECT_NAME_ERROR = new Error(
//   `Project name cannot be "${PROJECTS_LIST_NAME}"`,
// );

// export const PROJECT_NAME_EXISTS_ERROR = new Error(
//   'Project name already exists. Slugs must be unique.',
// );

// export const ILLO_NAME_EXISTS_ERROR = new Error(
//   'Illustration name already exists in project. Slugs must be unique.',
// );

// export const NO_PROJECT_EXISTS_ERROR = new Error(
//   'No such project exists.',
// );

// export const NO_ILLUSTRATION_EXISTS_ERROR = new Error(
//   'No such illustration exists.',
// );

// export const PROJECT_NO_RENAME = new Error(
//   'Project is uploaded and cannot be renamed. Please contact'
//   + ' an Artisan admin to change existing project or illustration names.',
// );
