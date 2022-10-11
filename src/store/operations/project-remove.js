import { projects, store } from '../init';

/**
 * Remove a project from the store.
 * This includes removing the entry from the `projects` array store.
 * @param {String} projectsSlug Kebab-case project name string
 */
export async function removeProject(projectsSlug) {
  const projectsArr = await store.get('projects');
  const projectEntry = await projects.get(projectsSlug);

  if (projectEntry) {
    await projects.delete(projectsSlug);

    if (projectsArr) {
      await store.set(
        'projects',
        projectsArr.filter((p) => p !== projectsSlug),
      );
    }

    await store.save();
    await projects.save();
  }
}
