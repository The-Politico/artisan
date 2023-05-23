/** @module atoms */
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import illustrations from './illustrations/atom';
import illustrationDetail from './illustrationDetail/atom';
import settingsAtom from './settings/atom';
import previewAtom from './preview/atom';
import statusAtomFamily from './status/atom';
import activeProjectAtom from './state/activeProject';
import projectsList from './selectors/projectsList';
import projectLastUploaded from './selectors/projectLastUploaded';
import illustrationsInProject from './selectors/illustrationsInProject';
import isPreviewActive from './selectors/isPreviewActive';

export default {
  illustrations,
  illustrationDetail,
  settings: settingsAtom,
  preview: previewAtom,
  status: statusAtomFamily,
  activeProject: activeProjectAtom,
  projectsList,
  projectLastUploaded,
  illustrationsInProject,
  isPreviewActive,

  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
};
