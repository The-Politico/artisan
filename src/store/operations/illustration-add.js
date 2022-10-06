import { projects } from '../init';

/**
 * Adds an illustration to a project with `publicURL` set to `null`.
 * @param {Object} opts
 * @param {String} opts.projectSlug Kebab-case project slug name
 * @param {String} opts.illustrationName Illustration display name
 * (e.g. "Illustration Name")
 * @returns
 */
export async function addIllustration({ projectSlug, illustrationName }) {
  const projectEntry = await projects.get(projectSlug);

  if (projectEntry) {
    const { illustrations } = projectEntry;
    const slug = illustrationName.toLowerCase().replaceAll(' ', '-');

    const newIllustration = {
      name: illustrationName,
      slug,
      publicURL: null,
    };

    await projects.set(projectSlug, {
      ...projectEntry,
      illustrations: [...illustrations, newIllustration],
    });

    await projects.save();

    return projects.get(projectSlug);
  }
  return null;
}
