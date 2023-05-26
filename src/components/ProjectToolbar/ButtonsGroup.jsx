import cls from 'classnames';
import { open } from '@tauri-apps/api/shell';
import IconButton from '../IconButton';
import styles from './styles.module.css';
import { flex, gap } from '../../theme';
import PublishButton from './PublishButton';
import MeatballButton from './MeatballButton';
import usePreviewProject from '../../hooks/usePreviewProject';
import getProjectSharePath from '../../utils/paths/getProjectSharePath';

export default function ButtonsGroup({ id }) {
  const [launchPreview] = usePreviewProject(id);

  // Opens generated share link in default browser
  const handleShareClick = async (e) => {
    e.preventDefault();
    const url = await getProjectSharePath(id, { asUrl: true });
    await open(url);
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
        onClick={handleShareClick}
      />
      <MeatballButton id={id} />
    </div>
  );
}
