import { WebviewWindow } from '@tauri-apps/api/window';
import ProjectList from '../ProjectList';
import ArtisanProject from '../ArtisanProject';
import Sidebar from '../Sidebar';
import WelcomeModal from '../WelcomeModal';
import { useActivateTime } from '../../atoms/now/init';

import styles from './styles.module.css';
import Button from '../Button';
import atoms from '../../atoms';
import { getProjectFolders } from '../../utils/box';

export default function AppView() {
  const [settings, setSettings] = atoms.useRecoilState(atoms.settings);

  useActivateTime();

  const handleClick = async () => {
    const baseUrl = 'https://account.box.com/api/oauth2/authorize';
    const clientId = import.meta.env.VITE_BOX_CLIENT_ID;
    const authorizationUrl = `${baseUrl}?client_id=${clientId}&response_type=code`;
    const view = new WebviewWindow('oauth', {
      url: authorizationUrl,
      center: true,
      focus: true,
      alwaysOnTop: true,
    });
  };

  const handleClick2 = async () => {
    console.log(settings);
    await getProjectFolders();
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
