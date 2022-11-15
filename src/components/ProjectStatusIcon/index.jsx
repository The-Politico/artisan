import cls from 'classnames';
import { ICONS } from './icons';
import styles from './styles.module.css';

/**
 *
 * @param {Object} props
 * @param {('md' | 'lg')} [props.size=md] Icon size. Medium or large
 * @param {('published' | 'archive')} [props.status] Published or archive.
 * Otherwise dispalys `"MinuseCircleIcon"`
 * @returns {JSX.Element}
 */
export default function ProjectStatusIcon({ status, size = 'md' }) {
  const iconClass = cls(styles.icon, styles[size], styles[status]);

  const IconComponent = ICONS[status] || ICONS.default;

  return (
    <div className={cls(iconClass)}>
      <IconComponent />
    </div>
  );
}
