import cls from 'classnames';
import {
  borders,
  colors,
  margin,
  padding,
  typography as type,
} from '../../theme';
import Input from '../Input';
import styles from './styles.module.css';

export default function Advanced({ projectsDir, port, setPort }) {
  return (
    <div className={cls(styles.advanced)}>
      <div>
        <Input
          label="Preferred Port"
          value={port}
          setValue={setPort}
          className={styles.settingsInput}
        />

        <p className={cls(type.textSm, colors.textSlate700, margin.mb2)}>
          Projects Folder
        </p>
        <p
          className={cls(
            styles.dir,
            padding.py1,
            padding.px2,
            borders.roundedLg,
          )}
        >
          {projectsDir}
        </p>
      </div>
    </div>

  );
}
