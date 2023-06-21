import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { appWindow } from '@tauri-apps/api/window';

export default function OathConfirm() {
  const [authCode, setAuthCode] = useState();

  useEffect(() => {
    if (!authCode) {
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      const { code } = params;
      setAuthCode(code);
    } else {
      const getToken = async () => {
        await invoke('request_token', { accessCode: authCode });
        appWindow.close();
      };

      getToken().catch(console.error);
    }
  }, [authCode]);

  return <div />;
}
