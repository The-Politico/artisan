/** @module atoms */
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import illustrations from './illustrations/atom';
import illustrationDetail from './illustrationDetail/atom';
import settingsAtom from './settings/atom';
import previewAtom from './preview/atom';
import statusAtomFamily from './status/atom';
import activeProjectAtom from './project/atom';
import projectsList from './selectors/projectsList';
import projectLastUploaded from './selectors/projectLastUploaded';
import projectLastPublishedChanged from './selectors/projectLastChanged';
import publishedStatusSelector from './selectors/publishedStatus';
import illustrationsInProject from './selectors/illustrationsInProject';
import isPreviewActive from './selectors/isPreviewActive';
import isConfigured from './selectors/isConfigured';

export default {
  illustrations,
  illustrationDetail,
  settings: settingsAtom,
  preview: previewAtom,
  status: statusAtomFamily,
  publishedStatus: publishedStatusSelector,
  activeProject: activeProjectAtom,
  projectsList,
  projectLastUploaded,
  projectLastPublishedChanged,
  illustrationsInProject,
  isPreviewActive,
  isConfigured,

  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
};
