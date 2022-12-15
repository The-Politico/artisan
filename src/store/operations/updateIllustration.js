import { PROJECTS } from '../init';
import verifyIlloExists from '../verification/illustrationExists';

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
  await verifyIlloExists(projectSlug, illustrationSlug);

  const projectEntry = await PROJECTS.get(projectSlug);

  const { illustrations } = projectEntry;
  const illoIndex = illustrations.findIndex(
    (d) => d.slug === illustrationSlug,
  );

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
