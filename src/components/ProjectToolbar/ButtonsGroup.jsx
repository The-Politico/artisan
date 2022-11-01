import cls from 'classnames';
import { open } from '@tauri-apps/api/shell';
import IconButton from '../IconButton';
import MeatballMenu from '../MeatballMenu';
import DownloadButton from './DownloadButton';
import styles from './styles.module.css';
import { flex, gap } from '../../theme';
import backupFiles from '../../actions/backupFiles';
import archiveProject from '../../actions/archiveProject';
import openInFinder from '../../actions/openInFinder';
import duplicateProject from '../../actions/duplicateProject';
import deleteProject from '../../actions/deleteProject';
import publishProject from '../../actions/publishProject';
import launchPreview from '../../actions/launchPreview';
import getSharePath from '../../utils/paths/getSharePath';

export default function ButtonsGroup({ projectSlug, status }) {
  const meatballItems = [
    {
      iconName: 'ServerIcon',
      label: 'Backup',
      action: () => backupFiles(projectSlug),
    },
    {
      iconName: 'ArchiveBoxIcon',
      label: 'Archive',
      action: () => archiveProject(projectSlug),
    },
    {
      iconName: 'FolderIcon',
      label: 'Open in Finder',
      action: () => openInFinder(projectSlug),
    },
    {
      iconName: 'DocumentDuplicateIcon',
      label: 'Duplicate',
      action: () => duplicateProject(projectSlug, `${projectSlug} Copy`),
    },
    {
      iconName: 'TrashIcon',
      label: 'Delete Project',
      action: () => deleteProject(projectSlug),
      danger: true,
    },
  ];

  const handleShareClick = async (e) => {
    e.preventDefault();
    const url = getSharePath(projectSlug, { asUrl: true });
    await open(url);
  };

  if (status === 'archive') {
    return <DownloadButton />;
  }

  return (
    <div className={cls(styles.btnGroup, flex.flex, flex.flexRow, gap.x3)}>
      <IconButton
        iconName="GlobeAltIcon"
        label="Publish"
        onClick={() => publishProject(projectSlug)}
      />
      <IconButton
        iconName="EyeIcon"
        label="Preview"
        onClick={() => launchPreview(projectSlug)}
      />
      <IconButton
        iconName="ShareIcon"
        label="Share"
        disabled={status !== 'published'}
        onClick={handleShareClick}
      />
      <MeatballMenu items={meatballItems} />
    </div>
  );
}
