import cls from 'classnames';
import {
  typography as type,
  colors,
  borders,
  effects,
  margin,
} from '../../theme';
import styles from './styles.module.css';

export default function EmptyProject() {
  return (
    <div className={styles.container}>
      <h2
        className={cls(
          colors.textSlate900,
          type.text2Xl,
          type.fontSemibold,
          margin.mb4,
        )}
      >
        There&apos;s nothing here yet 🙁
      </h2>
      <div
        className={cls(
          styles.emptyProject,
          borders.roundedLg,
          effects.shadowMd,
        )}
      >
        <p
          className={cls(
            styles.center,
            colors.textSlate800,
            type.textXl,
            margin.mt4,
          )}
        >
          Click &quot;New Project&quot; to get started
        </p>
      </div>
    </div>
  );
}
