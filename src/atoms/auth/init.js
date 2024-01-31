import { useEffect } from 'react';
import { fetch } from '@tauri-apps/api/http';
import { useRecoilState } from 'recoil';
import { BOX_BASE_API } from '../../box/DEV_constants';
import authAtom from './atom';

export default function useGetUserAuthData() {
  const [auth, setAuth] = useRecoilState(authAtom);
  useEffect(() => {
    const getUserData = async () => {
      if (auth.username === '') {
        const { access_token: token } = auth.box_tokens;
        const r = await fetch(`${BOX_BASE_API}/users/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { id, name: username } = r.data;
        setAuth({
          ...auth,
          user_id: id,
          username,
        });
      }
    };
    // eslint-disable-next-line no-console
    getUserData().catch(console.error);
  }, [auth]);
}
