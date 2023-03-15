import { selectorFamily } from 'recoil';
import joinSync from '../../utils/fs/joinSync';
import projectsAtomFamily from '../projects/atom';
import settingsAtom from '../settings/atom';

/**
 * The local directory path to a given project
 * @type {selectorFamily}
 */
const projectPath = selectorFamily({
  key: 'projectPath',
  get: (projectId) => ({ get }) => {
    const project = get(projectsAtomFamily(projectId));
    const settings = get(settingsAtom);
    const workingDirectory = settings['working-directory'];

    return joinSync(
      workingDirectory,
      project.slug,
    );
  },
});

export default projectPath;
