import { fetch } from '@tauri-apps/api/http';
import store from '../store';
import { BOX_LIST_FOLDERS_API, PROJECTS_FOLDER_ID_DEV } from './constants';
import { handleInvalidTokenError } from './handleError';

export async function getProjectFolders() {
  const { access_token: token } = await store.settings.get(
    'box_tokens',
  );

  const r = await fetch(BOX_LIST_FOLDERS_API(PROJECTS_FOLDER_ID_DEV), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (r.status === 401) {
    return handleInvalidTokenError(getProjectFolders);
  }

  return r.data;
}
