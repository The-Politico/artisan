import cls from 'classnames';
import { useState } from 'react';
import { open } from '@tauri-apps/api/shell';
import IconButton from '../IconButton';
import MeatballMenu from '../MeatballMenu';
import styles from './styles.module.css';
import { flex, gap } from '../../theme';
import act from '../../actions';
import getSharePath from '../../utils/paths/getSharePath';
import PublishButton from './PublishButton';

export default function ButtonsGroup({ projectSlug, status }) {
  const [showPubilshAlert, setShowPublishAlert] = useState(false);

  const meatballItems = [
    {
      iconName: 'ServerIcon',
      label: 'Backup',
      action: () => act.backupFiles(projectSlug),
    },
    {
      iconName: 'ArchiveBoxIcon',
      label: 'Archive',
      action: () => act.archiveProject(projectSlug),
    },
    {
      iconName: 'FolderIcon',
      label: 'Open in Finder',
      action: () => act.openInFinder(projectSlug),
    },
    {
      iconName: 'DocumentDuplicateIcon',
      label: 'Duplicate',
      action: () => act.duplicateProject(projectSlug, `${projectSlug}-copy`),
    },
    {
      iconName: 'TrashIcon',
      label: 'Delete Project',
      action: () => act.deleteProject(projectSlug),
      danger: true,
    },
  ];

  // Opens generated share link in default browser
  const handleShareClick = async (e) => {
    e.preventDefault();
    const url = getSharePath(projectSlug, { asUrl: true });
    await open(url);
  };

  // Only show download button when viewing archive project
  if (status === 'archive') {
    return (
      <div className={cls(styles.btnGroup)}>
        <IconButton
          iconName="ArrowDownTrayIcon"
          label="Download"
          onClick={() => act.downloadProject(projectSlug)}
        />
      </div>
    );
  }

  return (
    <div className={cls(styles.btnGroup, flex.flex, flex.flexRow, gap.x3)}>
      <PublishButton
        projectSlug={projectSlug}
        showPubilshAlert={showPubilshAlert}
        setShowPublishAlert={setShowPublishAlert}
      />
      <IconButton
        iconName="EyeIcon"
        label="Preview"
        onClick={() => act.launchPreview(projectSlug)}
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
