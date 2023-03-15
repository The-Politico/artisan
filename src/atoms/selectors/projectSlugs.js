import { selector } from 'recoil';
import projectsList from './projectsList';
import projectsAtom from '../projects/atom';

/**
 * All entity slugs that are projects
 * @type {selector}
 */
const projectSlugs = selector({
  key: 'projectSlugs',
  get: ({ get }) => {
    const projects = get(projectsList);
    return projects.map((projectId) => {
      const { slug: projectSlug } = get(projectsAtom(projectId));
      return projectSlug;
    });
  },
});

export default projectSlugs;
