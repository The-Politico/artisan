import { useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { appWindow } from '@tauri-apps/api/window';

export default function OathConfirm() {
  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    const { code } = params;
    const getToken = async () => {
      await invoke('request_token', { accessCode: code });
      appWindow.close();
    };

    getToken().catch(console.error);
  }, []);

  return <div />;
}
