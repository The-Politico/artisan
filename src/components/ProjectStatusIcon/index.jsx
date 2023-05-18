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
  const status = atoms.useRecoilValue(
    atoms.status(id),
  );

  const iconClass = cls(styles.icon, styles[size], styles[status], className);

  const IconComponent = ICONS[status] || ICONS.default;

  return (
    <div className={cls(iconClass)}>
      <IconComponent />
    </div>
  );
}
