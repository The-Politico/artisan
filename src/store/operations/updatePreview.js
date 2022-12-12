import { STORE } from '../init';
import {
  ACTIVE_PREVIEW_PROCESS,
  ACTIVE_PREVIEW_PROJECT,
} from '../constants';

export default async function updatePreview(projectSlug, pid) {
  await STORE.set(ACTIVE_PREVIEW_PROCESS, pid);
  await STORE.set(ACTIVE_PREVIEW_PROJECT, projectSlug);

  await STORE.save();
}
