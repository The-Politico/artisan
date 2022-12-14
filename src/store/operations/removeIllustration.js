import { PROJECTS } from '../init';
import verifyIlloExists from '../verification/illustrationExists';

/**
 * Removes an illustration from a project.
 * @param {Object} opts
 * @param {String} opts.projectSlug Kebab-case project slug name
 * @param {String} opts.illustrationSlug Kebe-case illustration slug name
 * @returns
 */
export default async function removeIllustration(
  { projectSlug, illustrationSlug },
) {
  await verifyIlloExists(projectSlug, illustrationSlug);
  const projectEntry = await PROJECTS.get(projectSlug);

  const { illustrations } = projectEntry;
  const illosUpdated = illustrations.filter(
    (d) => d.slug !== illustrationSlug,
  );

  await PROJECTS.set(projectSlug, {
    ...projectEntry,
    illustrations: illosUpdated,
  });

  await PROJECTS.save();

  return PROJECTS.get(projectSlug);
}
