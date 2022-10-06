import { store } from '../init';

/**
 * Adds an illustration to a project with `publicURL` set to `null`.
 * @param {Object} opts
 * @param {String} opts.projectSlug Kebab-case project slug name
 * @param {String} opts.illustrationName Illustration display name
 * (e.g. "Illustration Name")
 * @returns
 */
export async function addIllustration({ projectSlug, illustrationName }) {
  const projectEntry = await store.get(projectSlug);

  if (projectEntry) {
    const { illustrations } = projectEntry;
    const slug = illustrationName.toLowerCase().replaceAll(' ', '-');

    const newIllustration = {
      name: illustrationName,
      slug,
      publicURL: null,
    };

    await store.set(projectSlug, {
      ...projectEntry,
      illustrations: [...illustrations, newIllustration],
    });

    await store.save();

    return store.get(projectSlug);
  }
  return null;
}
