import { PROJECTS } from '../init';
import {
  NO_ILLUSTRATION_EXISTS_ERROR,
  NO_PROJECT_EXISTS_ERROR,
} from '../../errors/store';

export default async function illustrationExists(
  projectSlug,
  illustrationSlug,
) {
  const project = await PROJECTS.get(projectSlug);

  if (!project) {
    throw NO_PROJECT_EXISTS_ERROR;
  }

  const exists = project
    .illustrations
    .find((illo) => illo.slug === illustrationSlug);

  if (!exists) {
    throw NO_ILLUSTRATION_EXISTS_ERROR;
  }

  return true;
}
