import cls from 'classnames';
import { FolderIcon } from '@heroicons/react/20/solid';
import { open } from '@tauri-apps/api/dialog';
import { homeDir } from '@tauri-apps/api/path';
import styles from './styles.module.css';
import Button from '../Button';
import {
  colors,
  margin,
  typography as type,
  borders,
  flex,
  padding,
} from '../../theme';

export default function WorkingDir({ projectsDir, setProjectsDir }) {
  const handleClick = async () => {
    const selectedDir = await open({
      directory: true,
      multiple: false,
      defaultPath: await homeDir(),
    });

    setProjectsDir(selectedDir);
  };

  return (
    <div>
      <h2 className={cls(type.textLg, type.fontSemibold, colors.textSlate700)}>
        Projects Folder
      </h2>
      <p className={cls(type.textXs, colors.textSlate600, margin.mb2)}>
        Where your Adobe Illustrator files will be stored.
        <br />
        You probably don&apos;t need to change this.
      </p>
      <div className={cls(flex.flex)}>
        <Button
          variant="outline"
          className={cls(type.textSm, margin.mr2)}
          icon={<FolderIcon className={cls(styles.iconSm, margin.mr2)} />}
          onClick={handleClick}
        >
          Open
        </Button>
        <p
          className={cls(
            styles.dir,
            padding.px4,
            padding.py1,
            borders.roundedLg,
          )}
        >
          {projectsDir}
        </p>
      </div>
    </div>
  );
}
