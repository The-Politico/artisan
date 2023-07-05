import { fetch } from '@tauri-apps/api/http';
import store from '../store';
import { BOX_LIST_FOLDERS_API, PROJECTS_FOLDER_ID_DEV } from './constants';
import { handleInvalidTokenError } from './handleError';

export async function getProjectFolders() {
  const { access_token: token } = await store.auth.get(
    'box_tokens',
  );

  const r = await fetch(BOX_LIST_FOLDERS_API(PROJECTS_FOLDER_ID_DEV), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (r.status === 401) {
    try {
      const f = await handleInvalidTokenError(getProjectFolders);
      return f;
    } catch (error) {
      // If unable to refresh token, prompt for re-sign in.
      await store.settings.set({
        box_tokens: {},
      });
      return [];
    }
  }

  return r.data.entries;
}
