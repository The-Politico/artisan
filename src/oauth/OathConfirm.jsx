import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import atoms from '../atoms';

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
      console.log('URL: ', window.location);
      console.log('Code: ', oathCode);
      const getToken = async () => {
        const token = await invoke('request_token', { accessCode: oathCode });
        console.log('Returned token: ', token);
        setSettings({
          'access-token': token,
        });
      };

      getToken().catch(console.error);
    }
  }, [oathCode]);

  useEffect(() => {
    if (settings['access-token'] !== '') {
      setTimeout(() => {
        console.log(settings);
      }, 2000);
    }
  }, [settings]);

  return <div>Success!</div>;
}
