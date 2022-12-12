import { PROJECTS_LIST_NAME } from '../store/constants';

export const RESRVED_PROJECT_NAME_ERROR = new Error(
  `Project name cannot be "${PROJECTS_LIST_NAME}"`,
);

export const PROJECT_NAME_EXISTS_ERROR = new Error(
  'Project name already exists. Slugs must be unique.',
);

export const ILLO_NAME_EXISTS_ERROR = new Error(
  'Illustration name already exists in project. Slugs must be unique.',
);

export const NO_PROJECT_EXISTS_ERROR = new Error(
  'No such project exists.',
);

export const NO_ILLUSTRATION_EXISTS_ERROR = new Error(
  'No such illustration exists.',
);

export const PROJECT_NO_RENAME = new Error(
  'Project is uploaded and cannot be renamed. Please contact'
  + ' an Artisan admin to change the name of this project.',
);
