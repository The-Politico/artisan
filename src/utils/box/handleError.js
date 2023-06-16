import { invoke } from '@tauri-apps/api/tauri';
import store from '../../store';

export async function handleInvalidTokenError(cb) {
  const { refresh_token: refreshToken } = await store.settings.get(
    'box_tokens',
  );
  await invoke('request_token', { refreshToken });
  await cb();
}
