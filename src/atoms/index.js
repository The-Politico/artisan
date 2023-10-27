/** @module atoms */
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import illustrations from './illustrations/atom';
import illustrationDetail from './illustrationDetail/atom';
import settingsAtom from './settings/atom';
import previewAtom from './preview/atom';
import statusAtomFamily from './status/atom';
import activeProjectAtom from './project/atom';
import projectsList from './selectors/projectsList';
import projectLastUpdated from './selectors/projectLastUpdated';
import projectPublishedStatus from './selectors/projectPublishedStatus';
import illustrationsInProject from './selectors/illustrationsInProject';
import isPreviewActive from './selectors/isPreviewActive';
import isConfigured from './selectors/isConfigured';
import now from './now/atom';
import authAtom from './auth/atom';

export default {
  illustrations,
  illustrationDetail,
  now,
  settings: settingsAtom,
  preview: previewAtom,
  auth: authAtom,
  status: statusAtomFamily,
  activeProject: activeProjectAtom,
  projectsList,
  projectLastUpdated,
  projectPublishedStatus,
  illustrationsInProject,
  isPreviewActive,
  isConfigured,

  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
};
