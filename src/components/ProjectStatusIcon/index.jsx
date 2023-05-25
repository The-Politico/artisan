import cls from 'classnames';
import { ICONS } from './icons';
import styles from './styles.module.css';
import atoms from '../../atoms';

/**
 *
 * @param {Object} props
 * @param {('md' | 'lg')} [props.size=md] Icon size. Medium or large
 * @returns {JSX.Element}
 */
export default function ProjectStatusIcon({ id, size = 'md', className }) {
  const pubStatus = atoms.useRecoilValue(atoms.publishedStatus(id));

  const statusStyles = {
    STATUS_PROJECT_DRAFT: null,
    STATUS_PROJECT_PUBLISHED: 'published',
    STATUS_PROJECT_CHANGES: 'changes',
  };

  const iconClass = cls(
    styles.icon,
    styles[size],
    styles[statusStyles[pubStatus]],
    className,
  );

  const IconComponent = ICONS[pubStatus] || ICONS.default;

  return (
    <div className={cls(iconClass)}>
      <IconComponent />
    </div>
  );
}
