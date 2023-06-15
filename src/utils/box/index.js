import { fetch, Body } from '@tauri-apps/api/http';
import store from '../../store';
import { BOX_LIST_FOLDERS_API } from './constants';

export async function getProjectFolders() {
  const token = await store.settings.get('access-token');

  const r = await fetch(BOX_LIST_FOLDERS_API('210417182704'), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(r.data);
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
