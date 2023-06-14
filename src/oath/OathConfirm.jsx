import { useEffect, useState } from 'react';
import { emit } from '@tauri-apps/api/event';

export default function OathConfirm() {
  const [oathCode, setOathCode] = useState();

  useEffect(() => {
    if (!oathCode) {
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      const { code } = params;
      setOathCode(code);
    } else {
      console.log({ oathCode });
      (async () => {
        const url = 'https://api.box.com/oauth2/token';
        const authObj = new URLSearchParams({
          grant_type: 'authorization_code',
          code: oathCode,
          client_id: import.meta.env.VITE_BOX_CLIENT_ID,
          client_secret: import.meta.env.VITE_BOX_CLIENT_SECRET,
        });
        const r = await fetch(url, {
          method: 'POST',
          body: authObj,
        });
        const json = await r.json();
        console.log(json);
        await emit('keys-granted', {
          access_token: json.access_token,
          refresh_token: json.refresh_token,
        });
      })();
    }
  }, [oathCode]);

  return <div>OathConfirm</div>;
}
