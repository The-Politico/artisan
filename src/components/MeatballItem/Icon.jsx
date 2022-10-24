import * as icon from '@heroicons/react/20/solid';
import cls from 'classnames';
import styles from './styles.module.css';
import { margin } from '../../theme';

export default function Icon({ iconName }) {
  const HeroIcon = icon[iconName];
  return <HeroIcon className={cls(styles.iconSm, margin.mr2)} />;
}
