import cls from 'classnames';
import { useState } from 'react';
import { open } from '@tauri-apps/api/shell';
import IconButton from '../IconButton';
import MeatballMenu from '../MeatballMenu';
import styles from './styles.module.css';
import { flex, gap } from '../../theme';
import {
  backupFiles,
  archiveProject,
  downloadProject,
  openInFinder,
  duplicateProject,
  deleteProject,
  launchPreview,
} from '../../actions';
import getSharePath from '../../utils/paths/getSharePath';
import ConfirmPublishAlert from '../ConfirmPublishAlert';

export default function ButtonsGroup({ projectSlug, status }) {
  const [showPubilshAlert, setShowPublishAlert] = useState(false);

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

  // Opens generated share link in default browser
  const handleShareClick = async (e) => {
    e.preventDefault();
    const url = getSharePath(projectSlug, { asUrl: true });
    await open(url);
  };

  // Only show download button when viewing archive project
  if (status === 'archive') {
    console.log({projectSlug});
    return (
      <div className={cls(styles.btnGroup)}>
        <IconButton
          iconName="ArrowDownTrayIcon"
          label="Download"
          onClick={() => downloadProject(projectSlug)}
        />
      </div>
    );
  }

  return (
    <div className={cls(styles.btnGroup, flex.flex, flex.flexRow, gap.x3)}>
      <IconButton
        iconName="GlobeAltIcon"
        label="Publish"
        onClick={() => setShowPublishAlert(true)}
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
      <ConfirmPublishAlert
        projectSlug={projectSlug}
        showPubilshAlert={showPubilshAlert}
        setShowPublishAlert={setShowPublishAlert}
      />
    </div>
  );
}
