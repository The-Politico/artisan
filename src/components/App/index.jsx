import ProjectList from '../ProjectList';
import ArtisanProject from '../ArtisanProject';
import Sidebar from '../Sidebar';
import WelcomeModal from '../WelcomeModal';
import { useActivateTime } from '../../atoms/now/init';

import styles from './styles.module.css';
import Titlebar from '../Titlebar';
import useGetUserAuthData from '../../atoms/auth/init';

export default function AppView() {
  useActivateTime();

  // Adds Box user info to .auth store after sign-in
  useGetUserAuthData();

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
