import { useEffect, useState } from 'react';
import act from '../../actions';
import store from '../../store';
import MeatballMenu from '../MeatballMenu';
import RenamePopup from '../RenamePopup';

export default function MeatballButton({ projectSlug }) {
  const [oldName, setOldName] = useState('');
  const [showRename, setShowRename] = useState(false);

  useEffect(() => {
    (async () => {
      if (projectSlug) {
        const { name } = await store.getProject(projectSlug);
        if (name) {
          setOldName(name);
        }
      }
    })();
  }, []);

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
      iconName: 'PencilIcon',
      label: 'Rename',
      action: () => setShowRename(true),
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
    /* DELETE AFTER SHARE OUTPUT IS DONE */
    {
      iconName: 'ExclamationTriangleIcon',
      label: 'Output Share',
      action: () => act.outputShare(projectSlug),
    },
    {
      iconName: 'TrashIcon',
      label: 'Delete Project',
      action: () => act.deleteProject(projectSlug),
      danger: true,
    },
  ];
  return (
    <>
      <MeatballMenu items={meatballItems} />
      <RenamePopup
        showRename={showRename}
        setShowRename={setShowRename}
        oldName={oldName}
        projectSlug={projectSlug}
      />
    </>
  );
}
