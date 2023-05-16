import cls from 'classnames';
import { open } from '@tauri-apps/api/shell';
import IconButton from '../IconButton';
import styles from './styles.module.css';
import { flex, gap } from '../../theme';
import PublishButton from './PublishButton';
import MeatballButton from './MeatballButton';
import atoms from '../../atoms';
import useDownloadProject from '../../actions/useDownloadProject';
import usePreviewProject from '../../actions/usePreviewProject';
import { STATUS_PROJECT_ARCHIVED } from '../../constants/statuses';

export default function ButtonsGroup({ id }) {
  const status = atoms.useRecoilValue(
    atoms.status(id),
  );

  const download = useDownloadProject(id);
  const [launchPreview] = usePreviewProject(id);

  // Opens generated share link in default browser
  const handleShareClick = async (e) => {
    e.preventDefault();
    // TODO: Get the right URL
    await open('https://www.example.com');
  };

  // Only show download button when viewing archive project
  if (status === STATUS_PROJECT_ARCHIVED) {
    return (
      <div className={cls(styles.btnGroup)}>
        <IconButton
          iconName="ArrowDownTrayIcon"
          label="Download"
          onClick={download}
        />
      </div>
    );
  }

  return (
    <div className={cls(styles.btnGroup, flex.flex, flex.flexRow, gap.x3)}>
      <PublishButton id={id} />
      <IconButton
        iconName="EyeIcon"
        label="Preview"
        onClick={launchPreview}
      />
      <IconButton
        iconName="ShareIcon"
        label="Share"
        disabled={status !== 'published'}
        onClick={handleShareClick}
      />
      <MeatballButton id={id} />
    </div>
  );
}
