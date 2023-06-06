import cls from 'classnames';
import styles from './styles.module.css';

import {
  typography, margin, flex, layout, colors,
} from '../../theme';

export default function Logo() {
  const containerClass = cls(
    styles.container,
    flex.flex,
    flex.flexRow,
    layout.itemsCenter,
    margin.mb4,
  );

  const logoClass = cls(
    colors.textSlate800,
    typography.fontSemibold,
    typography.text3Xl,
  );

  return (
    <div className={containerClass}>
      <img className={styles.logo} src="/logo.png" alt="logo" />
      <div>
        <span className={logoClass}>Artisan</span>
      </div>
    </div>
  );
}
