import { PROJECTS } from '../init';
import {
  ILLO_NAME_EXISTS_ERROR,
} from '../../errors/store';

export default async function validIllustrationSlug(
  projectSlug,
  illustrationSlug,
) {
  const project = await PROJECTS.get(projectSlug);
  const existingIlloIdx = project
    .illustrations
    .findIndex((illo) => illo.slug === illustrationSlug);

  if (existingIlloIdx > -1) {
    throw ILLO_NAME_EXISTS_ERROR;
  }

  return true;
}
