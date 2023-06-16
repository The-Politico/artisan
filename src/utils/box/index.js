import { fetch } from '@tauri-apps/api/http';
import { invoke } from '@tauri-apps/api/tauri';
import store from '../../store';
import { BOX_LIST_FOLDERS_API } from './constants';
import { handleInvalidTokenError } from './handleError';

export async function getProjectFolders() {
  const { access_token: token } = await store.settings.get(
    'box_tokens',
  );

  const r = await fetch(BOX_LIST_FOLDERS_API('210417182704'), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (r.status === 401) {
    console.log(r);

    // token probbly failed
    // attempt token refresh here
    await invoke('refresh_token');
    return getProjectFolders();
  }

  return r.data;
}
