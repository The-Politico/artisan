import { PROJECTS_LIST_NAME } from '../store/constants';

export const RESRVED_PROJECT_NAME_ERROR = new Error(
  `Project name cannot be "${PROJECTS_LIST_NAME}"`,
);

export const PROJECT_NAME_EXISTS_ERROR = new Error(
  'Project name already exists. Slugs must be unique.',
);

export const NO_PROJECT_EXISTS_ERROR = new Error(
  'No such project exists.',
);

export const NO_ILLUSTRATION_EXISTS_ERROR = new Error(
  'No such illustration exists.',
);
