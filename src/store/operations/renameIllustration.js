import { PROJECTS } from '../init';
import slugify from '../../utils/text/slugify';
import getProject from './getProject';
import verifyIlloExists from '../verification/illustrationExists';

export default async function renameIllustration({
  project: projectSlug,
  slug,
  name,
}) {
  await verifyIlloExists(projectSlug, slug);

  const newIlloSlug = slugify(name);
  const projectInfo = await getProject(projectSlug);
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
