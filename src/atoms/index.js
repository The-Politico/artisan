/** @module atoms */
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import entitityAtom from './entities/atom';
import projectAtomFamily from './projects/atom';
import illustrationsAtomFamily from './illustrations/atom';
import settingsAtom from './settings/atom';
import previewAtom from './preview/atom';
import statusAtomFamily from './status/atom';
import activeProjectAtom from './state/activeProject';

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
import projectsListStatuses from './selectors/projectListStatuses';
import projectLastUploaded from './selectors/projectLastUploaded';
import illustrationsList from './selectors/illustrationsList';
import illustrationsInProject from './selectors/illustrationsInProject';
import isPreviewActive from './selectors/isPreviewActive';
import projectPath from './selectors/projectPath';
import illustrationPath from './selectors/illustrationPath';
import onReadStatus from './status/read';
import onWriteStatus from './status/write';

const atoms = {
  entities: entitityAtom,
  project: projectAtomFamily,
  illustration: illustrationsAtomFamily,
  settings: settingsAtom,
  preview: previewAtom,
  status: statusAtomFamily,
  activeProject: activeProjectAtom,
  projectsList,
  projectLastUploaded,
  projectsListStatuses,
  illustrationsList,
  illustrationsInProject,
  isPreviewActive,
  projectPath,
  illustrationPath,
};

/**
 * Utility interface for each atom and selector
 * @typedef  {Object} AtomsUseUtility
 * @property {atom} atom - The atom (or selector) instance it represents
 * @property {string} key - A unique key for this data
 * @property {function} useRecoilValue - Gets just the value of the atom
 * @property {function} useRecoilState - Get the value with a setter
 * @property {function} useSetRecoilState - Get just the setter for the atom
 */

/**
 * Interface to easily select atom and selector functions
 * @typedef  {Object} AtomsUse
 * @property {AtomsUseUtility} entites - Entities atom
 * @property {AtomsUseUtility} project - Projects atom familiy
 * @property {AtomsUseUtility} illustration - Illustrations atom family
 * @property {AtomsUseUtility} settings - Settings atom
 * @property {AtomsUseUtility} preview - Preview atom
 * @property {AtomsUseUtility} status - The status of a particular entity
 * @property {AtomsUseUtility} activeProject - The active project being viewed
 * @property {AtomsUseUtility} projectsList - Projects list selector
 * @property {AtomsUseUtility} projectLastUploaded - The last time a
 *  project's illustration was uploaed to archive
 * @property {AtomsUseUtility} projectsListStatuses - Projects list with status
 * @property {AtomsUseUtility} illustrationsList - Illustrations
 *  list selector
 * @property {AtomsUseUtility} illustrationsInProject - Illustrations in
 *  project selector
 * @property {AtomsUseUtility} isPreviewActive - Is preview active selector
 * @property {AtomsUseUtility} projectPath - Project path selector
 * @property {AtomsUseUtility} illustrationPath - Illustration path selector
 * @property {AtomsUseUtility} projectSlugs - Project slugs selector
 */

export default {
  /**
   * Interface to easily select atom and selector functions
   * @type {AtomsUse}
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
      status: onReadStatus,
    },
    write: {
      entities: onWriteEntities,
      projects: onWriteProject,
      illustrations: onWriteIllustration,
      settings: onWriteSettings,
      preview: onWritePreview,
      status: onWriteStatus,
    },
  },
};
