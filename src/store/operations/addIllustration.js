import { PROJECTS } from '../init';

/**
 * Adds an illustration to a project with `publicURL` set to `null`.
 * @param {Object} opts
 * @param {String} opts.projectSlug Kebab-case project slug name
 * @param {String} opts.illustrationName Illustration display name
 * (e.g. "Illustration Name")
 * @returns
 */
export default async function addIllustration(
  { projectSlug, illustrationName },
) {
  const projectEntry = await PROJECTS.get(projectSlug);

  if (projectEntry) {
    const { illustrations } = projectEntry;
    const slug = illustrationName.toLowerCase().replaceAll(' ', '-');

    const newIllustration = {
      name: illustrationName,
      slug,
      publicURL: null,
    };

    await PROJECTS.set(projectSlug, {
      ...projectEntry,
      illustrations: [...illustrations, newIllustration],
    });

    await PROJECTS.save();

    return PROJECTS.get(projectSlug);
  }

  return PROJECTS.get(projectSlug);
}
