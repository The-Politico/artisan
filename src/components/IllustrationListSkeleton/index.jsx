import cls from 'classnames';
import { borders } from '../../theme';

import Skeleton from '../Skeleton';
import styles from './styles.module.css';

export default function IllustrationListSkeleton() {
  return (
    <div className={cls(styles.container)}>
      <Skeleton
        className={cls(styles.skeleton, borders.roundedMd)}
        width="230px"
        height="180px"
      />
      <Skeleton
        className={cls(styles.skeleton, borders.roundedMd)}
        width="230px"
        height="180px"
      />
    </div>
  );
}
