import cls from 'classnames';
import { useEffect } from 'react';
import { ICONS } from './icons';
import styles from './styles.module.css';
import atoms from '../../atoms';
import getIllosInProject from '../../utils/store/getIllosInProject';

/**
 *
 * @param {Object} props
 * @param {('md' | 'lg')} [props.size=md] Icon size. Medium or large
 * @returns {JSX.Element}
 */
export default function ProjectStatusIcon({ id, size = 'md', className }) {
  const status = atoms.useRecoilValue(atoms.status(id));

  useEffect(() => {
    (async () => {
      const i = await getIllosInProject(id);
      console.log(i);
    })();
  }, []);

  const iconClass = cls(styles.icon, styles[size], styles[status], className);

  const IconComponent = ICONS[status] || ICONS.default;

  return (
    <div className={cls(iconClass)}>
      <IconComponent />
    </div>
  );
}
