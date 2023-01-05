import cls from 'classnames';
import styles from './styles.module.css';
import { flex } from '../../theme';
import Logo from '../Logo';
import CreateProjectButton from '../CreateProjectButton';
import SettingsButton from '../SettingsButton';

export default function Sidebar({ children }) {
  return (
    <div className={cls(styles.sidebar, flex.flex, flex.flexCol)}>
      <Logo />
      <CreateProjectButton />
      {children}
      <SettingsButton />
    </div>
  );
}
