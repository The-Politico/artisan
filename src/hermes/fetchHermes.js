import { fetch, Body, ResponseType } from '@tauri-apps/api/http';
import { invoke } from '@tauri-apps/api/tauri';
import store from '../store';

const HERMES_BASE_API = 'https://47fw4xs4ofawc7gk5curn24ixm0gjfis.lambda-url.us-east-1.on.aws';

const BODY_PARSERS = {
  text: Body.text,
  bytes: Body.bytes,
};

export default async function fetchHermes(args = {}) {
  const {
    route,
    body: bodyContent,
    contentType,
    method = 'GET',
    bodyType = 'text',
    responseType = ResponseType.Text,
    retry = true,
    ...options
  } = args;

  const tokens = await store.auth.get('box_tokens');
  const token = tokens?.access_token;

  const resp = await fetch(
    `${HERMES_BASE_API}/${route}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': contentType,
        ...options,
      },
      body: bodyContent
        ? BODY_PARSERS[bodyType](bodyContent)
        : undefined,
      responseType,
    },
  );

  console.log({ resp });

  if (resp.status === 200) {
    return resp.data;
  }

  if (resp.status === 403) {
    if (retry) {
      await invoke('refresh_token');
      return fetchHermes({ ...args, retry: false });
    }

    // If unable to refresh token, prompt for re-sign in.
    await store.auth.reset();
    return undefined;
  }

  return undefined;
}
