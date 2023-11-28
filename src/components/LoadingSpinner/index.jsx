import cls from 'classnames';
import styles from './styles.module.css';
import { flex, padding, typography as type } from '../../theme';

export default function LoadingSpinner() {
  const { flex: flx, flexCenter, flexCol } = flex;

  return (
    <div className={cls(flx, flexCenter, flexCol, padding.p8)}>
      <p className={cls(type.textSlate800, padding.py2)}>
        Creating project...
      </p>
      <div className={cls(styles.ldsRing)}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
