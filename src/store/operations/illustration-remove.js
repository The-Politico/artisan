import { store } from '../init';

/**
 * Removes an illustration from a project.
 * @param {Object} opts
 * @param {String} opts.projectSlug Kebab-case project slug name
 * @param {String} opts.illustrationSlug Kebe-case illustration slug name
 * @returns
 */
export async function removeIllustration({ projectSlug, illustrationSlug }) {
  const projectEntry = await store.get(projectSlug);

  if (projectEntry) {
    const { illustrations } = projectEntry;
    const illosUpdated = illustrations.filter(
      (d) => d.slug !== illustrationSlug,
    );

    await store.set(projectSlug, {
      ...projectEntry,
      illustrations: illosUpdated,
    });

    await store.save();

    return store.get(projectSlug);
  }

  throw new Error(`No such project exists for: ${projectSlug}`);
}