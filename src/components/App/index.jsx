/* eslint-disable jsx-a11y/no-static-element-interactions */
import { appWindow } from '@tauri-apps/api/window';
import { useEffect } from 'react';
import { fetch } from '@tauri-apps/api/http';
import ProjectList from '../ProjectList';
import ArtisanProject from '../ArtisanProject';
import Sidebar from '../Sidebar';
import WelcomeModal from '../WelcomeModal';
import { useActivateTime } from '../../atoms/now/init';

import styles from './styles.module.css';
import Button from '../Button';
import atoms from '../../atoms';
import { BOX_BASE_API } from '../../box-api/constants';

export default function AppView() {
  const [auth, setAuth] = atoms.useRecoilState(atoms.auth);

  useActivateTime();

  useEffect(() => {
    const getUserData = async () => {
      if (auth.username === '') {
        const r = await fetch(`${BOX_BASE_API}/users/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${auth.box_tokens.access_token}`,
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
      <div
        className={styles.titlebar}
        onMouseDown={async (e) => {
          console.log('mouse down');
          e.preventDefault();
          await appWindow.startDragging();
        }}
      />
      <Sidebar>
        {/* <Button
          onClick={() => console.log(auth)}
          value="Log auth"
        />
        <br />
        <Button
          onClick={async () => setAuth({
            ...auth,
            box_tokens: {},
          })}
          value="Delete tokens"
        />
        <br />
        <Button
          onClick={async () => setAuth({
            ...auth,
            box_tokens: {
              ...auth.box_tokens,
              access_token: 'lkjasdlfkjadslkfj',
              refresh_token: 'asdfkjfhKJHfah',
            },
          })}
          value="Force token refresh"
        /> */}
        <ProjectList />
      </Sidebar>
      <ArtisanProject />
      <WelcomeModal />
    </div>
  );
}
