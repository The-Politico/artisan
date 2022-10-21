import { ArchiveBoxIcon } from '@heroicons/react/24/solid';
import cls from 'classnames';
import { borders } from '../../theme';
import styles from './styles.module.css';

export default function ArchiveIcon({ size }) {
  const iconClass = cls(
    borders.roundedFull,
  );

  return (
    <div className={iconClass}>
      <ArchiveBoxIcon />
    </div>
  );
}
