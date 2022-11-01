import cls from 'classnames';
import IconButton from '../IconButton';
import MeatballMenu from '../MeatballMenu';
import DownloadButton from './DownloadButton';
import styles from './styles.module.css';
import { flex, gap } from '../../theme';

export default function ButtonsGroup({ projectSlug, status }) {
  const meatballItems = [
    {
      iconName: 'ServerIcon',
      label: 'Backup',
      action: () => console.log('Action Clicked'),
    },
    {
      iconName: 'ArchiveBoxIcon',
      label: 'Archive',
      action: () => console.log('Action Clicked'),
    },
    {
      iconName: 'FolderIcon',
      label: 'Open in Finder',
      action: () => console.log('Action Clicked'),
    },
    {
      iconName: 'DocumentDuplicateIcon',
      label: 'Duplicate',
      action: () => console.log('Action Clicked'),
    },
    {
      iconName: 'TrashIcon',
      label: 'Delete Project',
      action: () => console.log('Action Clicked'),
      danger: true,
    },
  ];

  if (status === 'archive') {
    return <DownloadButton />;
  }

  return (
    <div className={cls(styles.btnGroup, flex.flex, flex.flexRow, gap.x3)}>
      <IconButton
        iconName="GlobeAltIcon"
        label="Publish"
      />
      <IconButton
        iconName="EyeIcon"
        label="Preview"
      />
      <IconButton
        iconName="ShareIcon"
        label="Share"
        disabled={status !== 'published'}
      />
      <MeatballMenu items={meatballItems} />
    </div>
  );
}
