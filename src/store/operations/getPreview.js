import { STORE } from '../init';
import {
  ACTIVE_PREVIEW_PROCESS,
  ACTIVE_PREVIEW_PROJECT,
  PREFERRED_PORT,
} from '../constants';

export default async function getPreviewPid() {
  const pid = await STORE.get(ACTIVE_PREVIEW_PROCESS);
  const project = await STORE.get(ACTIVE_PREVIEW_PROJECT);
  const port = await STORE.get(PREFERRED_PORT);

  return {
    pid,
    project,
    port,
  };
}
