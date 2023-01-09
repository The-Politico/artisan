import cls from 'classnames';
import styles from './styles.module.css';

export default function Skeleton({
  variant = 'rectangle',
  height,
  width,
  className = '',
}) {
  return (
    <div
      className={cls(styles.skeleton, styles[variant], className)}
      width={width}
      style={{
        width,
        height,
      }}
    />
  );
}
