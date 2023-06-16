import { fetch } from '@tauri-apps/api/http';
import store from '../../store';
import { BOX_LIST_FOLDERS_API } from './constants';

export async function getProjectFolders() {
  const { access_token: token, ...rest } = await store.settings.get(
    'box_tokens',
  );

  const r = await fetch(BOX_LIST_FOLDERS_API('210417182704'), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(r);

  if (!r.ok) {
    console.log(r);
  // token probbly failed
  // attempt token refresh here
  // const { refresh_token } = rest;
  // await invoke('refresh_token', refreshToken: refresh_token)
  }

  return r.data;
}
