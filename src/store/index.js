import { STORE, PROJECTS } from './init';

import addIllustration from './operations/addIllustration';
import addProject from './operations/addProject';
import getPreview from './operations/getPreview';
import getProject from './operations/getProject';
import getProjectsList from './operations/getProjectsList';
import getSettings from './operations/getSettings';
import getWorkingDir from './operations/getWorkingDir';
import removeIllustration from './operations/removeIllustration';
import removeProject from './operations/removeProject';
import renameProject from './operations/renameProject';
import renameIllustration from './operations/renameIllustration';
import updateIllustration from './operations/updateIllustration';
import updatePreview from './operations/updatePreview';
import updateProject from './operations/updateProject';
import updateSettings from './operations/updateSettings';

export default {
  addIllustration,
  addProject,
  getPreview,
  getProject,
  getProjectsList,
  getSettings,
  getWorkingDir,
  removeIllustration,
  removeProject,
  renameProject,
  renameIllustration,
  updateIllustration,
  updatePreview,
  updateProject,
  updateSettings,
  stores: {
    STORE,
    PROJECTS,
  },
};
