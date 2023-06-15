import store from '../../store';
import { fetchAccessToken } from '../../utils/box';

export async function boxAccessTokenSync() {
  const unlisten = await store.settings.onKeyChange(
    'access-token',
    async (value) => {
      console.log('Change detected', value);
      // if (value !== '') {
      //   console.log('New key added, starting timer');
      //   setTimeout(async () => {
      //     console.log('Refreshing token');
      //     const refreshToken = await store.settings.get('refresh-token');
      //     const data = await fetchAccessToken(refreshToken, true);
      //     await store.settings.set({
      //       'refresh-token': data.refresh_token,
      //       'access-token': data.access_token,
      //     });
      //     console.log('success');
      //   }, 10000);
      // }
    },
  );

  return unlisten;
}
