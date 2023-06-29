/* eslint-disable jsx-a11y/no-static-element-interactions */
import { appWindow } from '@tauri-apps/api/window';
import ProjectList from '../ProjectList';
import ArtisanProject from '../ArtisanProject';
import Sidebar from '../Sidebar';
import WelcomeModal from '../WelcomeModal';
import { useActivateTime } from '../../atoms/now/init';

import styles from './styles.module.css';
import Button from '../Button';
import atoms from '../../atoms';

export default function AppView() {
  const [auth, setAuth] = atoms.useRecoilState(atoms.auth);

  useActivateTime();

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
        <Button
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
        />
        <ProjectList />
      </Sidebar>
      <ArtisanProject />
      <WelcomeModal />
    </div>
  );
}
