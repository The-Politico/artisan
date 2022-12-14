import { PROJECTS } from '../init';
import { NO_PROJECT_EXISTS_ERROR } from '../../errors/store';

export default async function projectExists(projectSlug) {
  const exists = await PROJECTS.has(projectSlug);

  if (!exists) {
    throw NO_PROJECT_EXISTS_ERROR;
  }

  return true;
}
