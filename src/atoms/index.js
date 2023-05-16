/** @module atoms */
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import entitityAtom from './entities/atom';
import illustrationsAtomFamily from './illustrations/atom';
import settingsAtom from './settings/atom';
import previewAtom from './preview/atom';
import statusAtomFamily from './status/atom';
import activeProjectAtom from './state/activeProject';

import onReadEntities from './entities/read';
import onWriteEntities from './entities/write';
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
import illustrationPath from './selectors/illustrationPath';
import onReadStatus from './status/read';
import onWriteStatus from './status/write';

export default {
  entities: entitityAtom,
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
  illustrationPath,

  useRecoilValue,
  useRecoilState,
  useSetRecoilState,

  /**
   * Interface to integrate to the syncing functions
   * @type {Object}
   */
  sync: {
    read: {
      entities: onReadEntities,
      illustrations: onReadIllustration,
      settings: onReadSettings,
      preview: onReadPreview,
      status: onReadStatus,
    },
    write: {
      entities: onWriteEntities,
      illustrations: onWriteIllustration,
      settings: onWriteSettings,
      preview: onWritePreview,
      status: onWriteStatus,
    },
  },
};
