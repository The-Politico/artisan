import cls from 'classnames';
import {
  ArchiveBoxIcon,
  CheckCircleIcon,
  MinusCircleIcon,
} from '@heroicons/react/24/solid';
import styles from './styles.module.css';
import ArchiveIcon from './ArchiveIcon';
import { padding, flex } from '../../theme';

/**
 *
 * @param {Object} props
 * @param {('md' | 'lg')} [props.size=md] Icon size. Medium or large
 * @returns
 */
export default function ProjectStatusIcon({ status, size = 'md' }) {
  const iconClass = cls(styles.icon, styles[size], styles[status]);

  const renderIcon = () => {
    if (status === 'published') {
      return <CheckCircleIcon />;
    }
    if (status === 'archive') {
      return (
        <ArchiveBoxIcon
          className={cls(flex.flexAuto, padding.p2)}
        />
      );
    }
    return <MinusCircleIcon />;
  };

  return <div className={cls(iconClass)}>{renderIcon()}</div>;
}
