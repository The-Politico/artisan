import { Body, fetch } from '@tauri-apps/api/http';
import ProjectList from '../ProjectList';
import ArtisanProject from '../ArtisanProject';
import Sidebar from '../Sidebar';
import WelcomeModal from '../WelcomeModal';
import { useActivateTime } from '../../atoms/now/init';

import styles from './styles.module.css';
import Button from '../Button';
import atoms from '../../atoms';
import { BOX_FOLDER_API, BOX_LOCK_FOLDER } from '../../box-api/constants';

export default function AppView() {
  const [settings, setSettings] = atoms.useRecoilState(atoms.settings);

  useActivateTime();

  const {
    box_tokens: { access_token: token },
  } = settings;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // log settings to confirm tokens were added
  const handleClick2 = async () => {
    console.log(settings);
  };

  const lockFolder = async () => {
    const d = await fetch(BOX_FOLDER_API('213943980371'), {
      method: 'GET',
      headers,
    });
    console.log(d);
    const r = await fetch(BOX_LOCK_FOLDER, {
      headers,
      method: 'POST',
      body: Body.json({
        folder: {
          id: '213943980371',
          type: 'folder',
        },
      }),
    });

    console.log(r);
  };

  const deleteLock = async () => {
    const locks = await fetch(`${BOX_LOCK_FOLDER}?folder_id=213943980371`, {
      method: 'GET',
      headers,
    });
    console.log(locks.data);
    // Lock ID comes either from initial create repsone or
    // via `GET` on a given folder ID
    // const r = await fetch(`${BOX_LOCK_FOLDER}/2805965804`, {
    //   headers,
    //   method: 'DELETE',
    // });
    // console.log(r.data);
  };

  return (
    <div className={styles.grid}>
      <Sidebar>
        <Button
          onClick={lockFolder}
          value="Lock folder"
        />
        <br />
        <Button
          onClick={deleteLock}
          value="Delete lock"
        />
        <br />
        <Button
          onClick={handleClick2}
          value="log settings"
        />
        <br />
        <Button
          onClick={async () => setSettings({
            ...settings,
            box_tokens: {},
          })}
          value="delete tokens"
        />
        <br />
        <Button
          onClick={async () => setSettings({
            ...settings,
            box_tokens: {
              ...settings.box_tokens,
              access_token: 'lkjasdlfkjadslkfj',
              refresh_token: 'asdfkjfhKJHfah',
            },
          })}
          value="force token refresh"
        />
        <ProjectList />
      </Sidebar>
      <ArtisanProject />
      <WelcomeModal />
    </div>
  );
}
