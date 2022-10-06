import { projects } from '../init';

/**
 * Removes an illustration from a project.
 * @param {Object} opts
 * @param {String} opts.projectSlug Kebab-case project slug name
 * @param {String} opts.illustrationSlug Kebe-case illustration slug name
 * @returns
 */
export async function removeIllustration({ projectSlug, illustrationSlug }) {
  const projectEntry = await projects.get(projectSlug);

  if (!projectEntry) {
    throw new Error(`No such project exists for: ${projectSlug}`);
  }

  const { illustrations } = projectEntry;
  const illosUpdated = illustrations.filter(
    (d) => d.slug !== illustrationSlug,
  );

  await projects.set(projectSlug, {
    ...projectEntry,
    illustrations: illosUpdated,
  });

  await projects.save();

  return projects.get(projectSlug);
}
