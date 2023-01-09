import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import cls from 'classnames';
import styles from './styles.module.css';
import { colors } from '../../theme';

export default function IlloHover({ hoverState }) {
  if (!hoverState) {
    return null;
  }
  return (
    <div className={styles.hoverState}>
      <ArrowTopRightOnSquareIcon
        className={cls(styles.arrowIcn, colors.textSlate200)}
      />
    </div>
  );
}
