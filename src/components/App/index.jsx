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

export default function AppView() {
  const [settings, setSettings] = atoms.useRecoilState(atoms.settings);

  useActivateTime();

  const handleClick = async () => {
    const url = await invoke('get_auth_url');
    const view = new WebviewWindow('oauth', {
      url,
      center: true,
      focus: true,
      alwaysOnTop: true,
    });
  };

  const handleClick2 = async () => {
    console.log(settings);
  };

  const handleClick3 = async () => {
    setSettings({
      'access-token': '',
    });
    console.log(settings);
  };

  return (
    <div className={styles.grid}>
      <Sidebar>
        {!settings['access-token'] && (
          <Button
            onClick={handleClick}
            value="Sign-in to Box"
          />
        )}
        <br />
        <Button
          onClick={handleClick2}
          value="log webview"
        />
        <br />
        <Button
          onClick={handleClick3}
          value="delete token"
        />
        <ProjectList />
      </Sidebar>
      <ArtisanProject />
      <WelcomeModal />
    </div>
  );
}
