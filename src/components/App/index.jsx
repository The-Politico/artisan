import { useEffect } from 'react';
import { fetch } from '@tauri-apps/api/http';
import ProjectList from '../ProjectList';
import ArtisanProject from '../ArtisanProject';
import Sidebar from '../Sidebar';
import WelcomeModal from '../WelcomeModal';
import { useActivateTime } from '../../atoms/now/init';

import styles from './styles.module.css';
import atoms from '../../atoms';
import { BOX_BASE_API } from '../../box/DEV_constants';
import Titlebar from '../Titlebar';

export default function AppView() {
  const [auth, setAuth] = atoms.useRecoilState(atoms.auth);

  useActivateTime();

  // DEV
  // Adds Box user info to .auth store after sign-in
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

    getUserData().catch(console.error);
  }, [auth]);

  return (
    <div className={styles.grid}>
      <Titlebar />
      <Sidebar>
        <ProjectList />
      </Sidebar>
      <ArtisanProject />
      <WelcomeModal />
    </div>
  );
}
