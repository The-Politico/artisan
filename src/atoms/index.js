/** @module atoms */
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import entitityAtom from './entities/atom';
import projectAtomFamily from './projects/atom';
import illustrationsAtomFamily from './illustrations/atom';
import settingsAtom from './settings/atom';
import previewAtom from './preview/atom';

import onReadEntities from './entities/read';
import onWriteEntities from './entities/write';
import onReadProject from './projects/read';
import onWriteProject from './projects/write';
import onReadIllustration from './illustrations/read';
import onWriteIllustration from './illustrations/write';
import onReadSettings from './settings/read';
import onWriteSettings from './settings/write';
import onReadPreview from './preview/read';
import onWritePreview from './preview/write';

import projectsList from './selectors/projectsList';
import illustrationsList from './selectors/illustrationsList';
import illustrationsInProject from './selectors/illustrationsInProject';
import isPreviewActive from './selectors/isPreviewActive';
import projectPath from './selectors/projectPath';
import illustrationPath from './selectors/illustrationPath';
import projectSlugs from './selectors/projectSlugs';

const atoms = {
  entities: entitityAtom,
  project: projectAtomFamily,
  illustration: illustrationsAtomFamily,
  settings: settingsAtom,
  preview: previewAtom,
  projectsList,
  illustrationsList,
  illustrationsInProject,
  isPreviewActive,
  projectPath,
  illustrationPath,
  projectSlugs,
};

/**
 * Utility interface for each atom and selector
 * @typedef  {function(familyKey=)} Atoms~Use~Utility
 * @property {atom} atom - The atom (or selector) instance it represents
 * @property {string} key - A unique key for this data
 * @property {function} useRecoilValue - Gets just the value of the atom
 * @property {function} useRecoilState - Get the value with a setter
 * @property {function} useSetRecoilState - Get just the setter for the atom
 */

/**
 * Interface to easily select atom and selector functions
 * @typedef  {Object} Atoms~Use
 * @property {Atoms~Use~Utility} entites - Entities atom
 * @property {Atoms~Use~Utility} project - Projects atom familiy
 * @property {Atoms~Use~Utility} illustration - Illustrations atom family
 * @property {Atoms~Use~Utility} settings - Settings atom
 * @property {Atoms~Use~Utility} preview - Preview atom
 * @property {Atoms~Use~Utility} projectsList - Projects list selector
 * @property {Atoms~Use~Utility} illustrationsList - Illustrations
 *  list selector
 * @property {Atoms~Use~Utility} illustrationsInProject - Illustrations in
 *  project selector
 * @property {Atoms~Use~Utility} isPreviewActive - Is preview active selector
 * @property {Atoms~Use~Utility} projectPath - Project path selector
 * @property {Atoms~Use~Utility} illustrationPath - Illustration path selector
 * @property {Atoms~Use~Utility} projectSlugs - Project slugs selector
 */

export default {
  /**
   * Interface to easily select atom and selector functions
   * @type {Atoms~Use}
   */
  use: Object.keys(atoms).reduce((atomsAcc, atomKey) => {
    const atom = atoms[atomKey];
    const isFamily = typeof atom === 'function';

    // eslint-disable-next-line no-param-reassign
    const func = (arg) => useRecoilValue(isFamily ? atom(arg) : atom);
    func.atom = atom;
    func.key = atomKey;
    func.useRecoilValue = func;
    func.useRecoilState = (arg) => useRecoilState(isFamily ? atom(arg) : atom);
    func.useSetRecoilState = (arg) => useSetRecoilState(
      isFamily ? atom(arg) : atom,
    );

    // eslint-disable-next-line no-param-reassign
    atomsAcc[atomKey] = func;

    return atomsAcc;
  }, {}),

  /**
   * Interface to integrate to the syncing functions
   * @type {Object}
   */
  sync: {
    read: {
      entities: onReadEntities,
      projects: onReadProject,
      illustrations: onReadIllustration,
      settings: onReadSettings,
      preview: onReadPreview,
    },
    write: {
      entities: onWriteEntities,
      projects: onWriteProject,
      illustrations: onWriteIllustration,
      settings: onWriteSettings,
      preview: onWritePreview,
    },
  },
};
