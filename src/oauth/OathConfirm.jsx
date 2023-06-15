import { useEffect, useState } from 'react';
import { appWindow } from '@tauri-apps/api/window';
import atoms from '../atoms';
import { fetchAccessToken } from '../utils/box';

export default function OathConfirm() {
  const [settings, setSettings] = atoms.useRecoilState(atoms.settings);
  const [oathCode, setOathCode] = useState();

  useEffect(() => {
    if (!oathCode) {
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      const { code } = params;
      setOathCode(code);
    } else {
      const getToken = async () => {
        const data = await fetchAccessToken(oathCode);
        setSettings({
          'access-token': data.access_token,
          'refresh-token': data.refresh_token,
        });
      };

      getToken().catch(console.error);
    }
  }, [oathCode]);

  useEffect(() => {
    if (settings['access-token'] !== '') {
      setTimeout(() => {
        appWindow.close();
      }, 2000);
    }
  }, [settings]);

  return <div>Success!</div>;
}
