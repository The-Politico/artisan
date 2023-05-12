import { selectorFamily } from 'recoil';
import settingsAtom from '../settings/atom';
import joinSync from '../../utils/fs/joinSync';
import idToSlugs from '../../utils/ids/idToSlugs';

/**
 * The local directory path to a given illustration
 * @type {selectorFamily}
 */
const illustrationPath = selectorFamily({
  key: 'illustrationPath',
  get: (illustrationId) => ({ get }) => {
    const settings = get(settingsAtom);
    const workingDirectory = settings['working-directory'];

    const slugs = idToSlugs(illustrationId);

    return joinSync(
      workingDirectory,
      slugs.project,
      slugs.illustration,
    );
  },
});

export default illustrationPath;
