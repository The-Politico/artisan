import { PROJECTS } from '../init';
import slugify from '../../utils/text/slugify';
import verifyProjectExists from '../verification/projectExists';
import verifyIllustrationSlug from '../verification/validIllustrationSlug';

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
  await verifyProjectExists(projectSlug);

  const slug = slugify(illustrationName);
  await verifyIllustrationSlug(projectSlug, slug);

  const projectEntry = await PROJECTS.get(projectSlug);

  const { illustrations } = projectEntry;

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
