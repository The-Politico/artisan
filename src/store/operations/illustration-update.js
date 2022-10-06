import { projects } from '../init';

/**
 * Updates an illustration's public URL field.
 * @param {Object} opts
 * @param {String} opts.projectSlug Kebab-case project slug name
 * @param {String} opts.illustrationSlug Kebe-case illustration slug name
 * @param {String} opts.publicURL Illustration's public URL once the project
 * has been published
 * @returns
 */
export async function updateIllustrationURL(
  {
    projectSlug,
    illustrationSlug,
    publicURL,
  },
) {
  const projectEntry = await projects.get(projectSlug);

  if (projectEntry) {
    const { illustrations } = projectEntry;
    const illoIndex = illustrations.findIndex(
      (d) => d.slug === illustrationSlug,
    );

    if (illoIndex < 0) {
      throw new Error(`No such illustration exists for: ${illustrationSlug}`);
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

    await projects.set(projectSlug, {
      ...projectEntry,
      illustrations: illosUpdated,
    });

    await projects.save();

    return projects.get(projectSlug);
  }

  throw new Error(`No such project exists for: ${projectSlug}`);
}
