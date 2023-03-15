import { selectorFamily } from 'recoil';
import projectsAtomFamily from '../projects/atom';
import settingsAtom from '../settings/atom';
import illustrationsAtomFamily from '../illustrations/atom';
import joinSync from '../../utils/fs/joinSync';

/**
 * The local directory path to a given illustration
 * @type {selectorFamily}
 */
const illustrationPath = selectorFamily({
  key: 'illustrationPath',
  get: (illustrationId) => ({ get }) => {
    const illustration = get(illustrationsAtomFamily(illustrationId));
    const project = get(projectsAtomFamily(illustration.project));
    const settings = get(settingsAtom);
    const workingDirectory = settings['working-directory'];

    return joinSync(
      workingDirectory,
      project.slug,
      illustration.slug,
    );
  },
});

export default illustrationPath;
