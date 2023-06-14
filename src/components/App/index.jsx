import { WebviewWindow } from '@tauri-apps/api/window';
import ProjectList from '../ProjectList';
import ArtisanProject from '../ArtisanProject';
import Sidebar from '../Sidebar';
import WelcomeModal from '../WelcomeModal';
import { useActivateTime } from '../../atoms/now/init';

import styles from './styles.module.css';
import Button from '../Button';
import atoms from '../../atoms';

export default function AppView() {
  const settings = atoms.useRecoilValue(
    atoms.settings,
  );

  useActivateTime();

  const handleClick = async () => {
    console.log('CLICKED');
    const baseUrl = 'https://account.box.com/api/oauth2/authorize';
    const clientId = import.meta.env.VITE_BOX_CLIENT_ID;
    const authorizationUrl = `${baseUrl}?client_id=${clientId}&response_type=code`;
    const webview = new WebviewWindow('oauth', {
      url: authorizationUrl,
      center: true,
      focus: true,
      alwaysOnTop: true,
    });
  };

  const handleClick2 = async () => {
    const oathWindow = WebviewWindow.getByLabel('oauth');
    console.log(oathWindow);
  };

  return (
    <div className={styles.grid}>
      <Sidebar>
        {!settings['access-token'] && (
        <Button
          onClick={handleClick}
          value="Show OAuth"
        />
        )}
        <Button
          onClick={handleClick2}
          value="log webview"
        />
        <ProjectList />
      </Sidebar>
      <ArtisanProject />
      <WelcomeModal />
    </div>
  );
}
