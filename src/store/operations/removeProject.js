import { PROJECTS, STORE } from '../init';
import { PROJECTS_LIST_NAME } from '../constants';

/**
 * Remove a project from the store.
 * This includes removing the entry from the `projects` array store.
 * @param {String} projectsSlug Kebab-case project name string
 */
export default async function removeProject(projectsSlug) {
  const projectsArr = await STORE.get('projects');
  const projectEntry = await PROJECTS.get(projectsSlug);

  if (projectEntry) {
    await PROJECTS.delete(projectsSlug);

    if (projectsArr) {
      await STORE.set(
        PROJECTS_LIST_NAME,
        projectsArr.filter((p) => p !== projectsSlug),
      );
    }

    await STORE.save();
    await PROJECTS.save();
  }
}
