import { fetch, Body } from '@tauri-apps/api/http';
import store from '../../store';
import { BOX_LIST_FOLDERS_API } from './constants';

export async function getProjectFolders() {
  const { access_toke: token, ...rest } = await store.settings.get(
    'box_tokens',
  );

  const r = await fetch(BOX_LIST_FOLDERS_API('210417182704'), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!r.ok) {
    // token probbly failed
    // attempt token refresh here
    // const { refresh_token } = rest;
    // await invoke('refresh_token', refreshToken: refresh_token)
  }

  return r.data;
}

export async function fetchAccessToken(oauthCode, isRefresh = false) {
  const url = 'https://api.box.com/oauth2/token';
  const authObj = {
    grant_type: isRefresh ? 'refresh_token' : 'authorization_code',
    client_id: import.meta.env.VITE_BOX_CLIENT_ID,
    client_secret: import.meta.env.VITE_BOX_CLIENT_SECRET,
  };

  if (isRefresh) {
    authObj.refresh_token = oauthCode;
  } else {
    authObj.code = oauthCode;
  }

  const body = Body.form(authObj);
  const response = await fetch(url, {
    method: 'POST',
    body,
  });

  if (!response.ok) {
    throw new Error('Unable to fetch tokens: ', response);
  }

  return response.data;
}
