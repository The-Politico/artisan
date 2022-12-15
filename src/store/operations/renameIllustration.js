import { PROJECTS } from '../init';
import { PROJECT_NO_RENAME } from '../../errors/store';
import slugify from '../../utils/text/slugify';
import verifyIlloExists from '../verification/illustrationExists';
import validIllustrationSlug from '../verification/validIllustrationSlug';

export default async function renameIllustration({
  project: projectSlug,
  slug,
  name,
}) {
  await verifyIlloExists(projectSlug, slug);

  const newIlloSlug = slugify(name);
  await validIllustrationSlug(projectSlug, newIlloSlug);

  const projectInfo = await PROJECTS.get(projectSlug);
  if (projectInfo.isUploaded) {
    throw PROJECT_NO_RENAME;
  }

  const illoInfo = projectInfo
    .illustrations
    .find((illo) => illo.slug === slug);

  PROJECTS.set(projectSlug, {
    ...projectInfo,
    illustrations: [
      ...projectInfo.illustrations.filter((illo) => illo.slug !== slug),
      {
        ...illoInfo,
        name,
        slug: newIlloSlug,
      },
    ],
  });

  await PROJECTS.save();

  const newProjectsInfo = await PROJECTS.get(projectSlug);
  const newIlloInfo = newProjectsInfo
    .illustrations.find((illo) => illo.slug === newIlloSlug);

  return newIlloInfo || {};
}
