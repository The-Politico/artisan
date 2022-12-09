import cls from 'classnames';
import {
  borders, colors, margin, typography as type,
} from '../../theme';
import Input from '../Input';
import styles from './styles.module.css';

export default function Advanced({
  isInitial,
  projectsDir,
  setProjestDir,
  port,
  setPort,
}) {
  if (!isInitial) {
    return (
      <div className={styles.advanced}>
        <p
          className={cls(
            type.textSm,
            type.fontSemibold,
            colors.textSlate700,
            margin.mb2,
          )}
        >
          Advanced
        </p>
        <p className={cls(styles.dir, borders.roundedMd)}>{projectsDir}</p>
        <Input
          label="Preferred Port"
          value={port}
          setValue={setPort}
          className={styles.settingsInput}
        />
      </div>
    );
  }

  return <div />;
}
