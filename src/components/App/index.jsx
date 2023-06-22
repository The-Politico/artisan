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

  // log settings to confirm tokens were added
  const handleClick2 = async () => {
    console.log(settings);
  };

  return (
    <div className={styles.grid}>
      <Sidebar>
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
