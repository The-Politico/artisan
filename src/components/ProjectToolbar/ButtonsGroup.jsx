import cls from 'classnames';
import { open } from '@tauri-apps/api/shell';
import IconButton from '../IconButton';
import styles from './styles.module.css';
import { flex, gap } from '../../theme';
import PublishButton from './PublishButton';
import MeatballButton from './MeatballButton';
import atoms from '../../atoms';
import useDownloadProject from '../../hooks/useDownloadProject';
import usePreviewProject from '../../hooks/usePreviewProject';

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
