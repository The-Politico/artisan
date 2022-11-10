import { PROJECTS } from '../init';
import {
  NO_PROJECT_EXISTS_ERROR,
  NO_ILLUSTRATION_EXISTS_ERROR,
} from '../../errors/store';

/**
 * Updates an illustration's public URL field.
 * @param {Object} opts
 * @param {String} opts.projectSlug Kebab-case project slug name
 * @param {String} opts.illustrationSlug Kebe-case illustration slug name
 * @param {String} opts.publicURL Illustration's public URL once the project
 * has been published
 * @returns
 */
export default async function updateIllustrationURL({
  projectSlug,
  illustrationSlug,
  publicURL,
}) {
  const projectEntry = await PROJECTS.get(projectSlug);

  if (!projectEntry) {
    throw NO_PROJECT_EXISTS_ERROR;
  }

  const { illustrations } = projectEntry;
  const illoIndex = illustrations.findIndex(
    (d) => d.slug === illustrationSlug,
  );

  if (illoIndex < 0) {
    throw NO_ILLUSTRATION_EXISTS_ERROR;
  }

  const illosUpdated = illustrations.map((d, i) => {
    if (i === illoIndex) {
      return {
        ...d,
        publicURL,
      };
    }
    return d;
  });

  await PROJECTS.set(projectSlug, {
    ...projectEntry,
    illustrations: illosUpdated,
  });

  await PROJECTS.save();

  return PROJECTS.get(projectSlug);
}
