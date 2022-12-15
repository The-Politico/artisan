import { PROJECTS, STORE } from '../init';
import { PROJECTS_LIST_NAME } from '../constants';
import { PROJECT_NO_RENAME } from '../../errors/store';
import slugify from '../../utils/text/slugify';
import verifyProjectExists from '../verification/projectExists';
import validProjectSlug from '../verification/validProjectSlug';

export default async function renameProject({
  slug,
  name,
}) {
  await verifyProjectExists(slug);

  const newProjectSlug = slugify(name);
  await validProjectSlug(newProjectSlug, { method: 'rename' });

  const projectInfo = await PROJECTS.get(slug);
  if (projectInfo.isUploaded) {
    throw PROJECT_NO_RENAME;
  }

  const projectsArr = await STORE.get(PROJECTS_LIST_NAME);
  STORE.set(PROJECTS_LIST_NAME, [
    ...projectsArr.filter((fSlug) => fSlug !== slug),
    newProjectSlug,
  ]);

  PROJECTS.set(newProjectSlug, {
    ...projectInfo,
    name,
    slug: newProjectSlug,
  });
  PROJECTS.delete(slug);

  await Promise.all([
    STORE.save(),
    PROJECTS.save(),
  ]);

  return PROJECTS.get(newProjectSlug);
}
