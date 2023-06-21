import { WebviewWindow } from '@tauri-apps/api/window';
import { invoke } from '@tauri-apps/api/tauri';
import ProjectList from '../ProjectList';
import ArtisanProject from '../ArtisanProject';
import Sidebar from '../Sidebar';
import WelcomeModal from '../WelcomeModal';
import { useActivateTime } from '../../atoms/now/init';

import styles from './styles.module.css';
import Button from '../Button';
import atoms from '../../atoms';
import { getProjectFolders } from '../../box-api';
import { subscribeToEvents } from '../../box-api/sync';

export default function AppView() {
  const [settings, setSettings] = atoms.useRecoilState(atoms.settings);

  useActivateTime();

  const handleClick = async () => {
    const url = await invoke('get_auth_url');
    // eslint-disable-next-line no-unused-vars
    const view = new WebviewWindow('oauth', {
      url,
      center: true,
      focus: true,
      alwaysOnTop: true,
    });
  };

  // log settings to confirm tokens were added
  const handleClick2 = async () => {
    console.log(settings);
    await subscribeToEvents();
  };

  return (
    <div className={styles.grid}>
      <Sidebar>
        {!settings.box_tokens?.access_token && (
          <Button
            onClick={handleClick}
            value="Sign-in to Box"
          />
        )}
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
              access_token: 'foobar',
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
