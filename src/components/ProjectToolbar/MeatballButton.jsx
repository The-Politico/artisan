import useBackupProject from '../../hooks/useBackupProject';
// import useArchiveProject from '../../hooks/useArchiveProject';
import useOpenProject from '../../hooks/useOpenProject';
import useDuplicateProject from '../../hooks/useDuplicateProject';
import useDeleteProject from '../../hooks/useDeleteProject';

import MeatballMenu from '../MeatballMenu';

export default function MeatballButton({ id }) {
  const backup = useBackupProject(id);
  // const archive = useArchiveProject(id);
  const open = useOpenProject(id);
  const duplicate = useDuplicateProject(id);
  const deleteProject = useDeleteProject(id);

  const meatballItems = [
    {
      iconName: 'ServerIcon',
      label: 'Backup',
      action: backup,
    },
    // {
    //   iconName: 'ArchiveBoxIcon',
    //   label: 'Archive',
    //   action: archive,
    // },
    {
      iconName: 'FolderIcon',
      label: 'Open in Finder',
      action: open,
    },
    {
      iconName: 'DocumentDuplicateIcon',
      label: 'Duplicate',
      action: duplicate,
    },
    {
      iconName: 'TrashIcon',
      label: 'Delete Project',
      action: deleteProject,
      danger: true,
    },
  ];
  return (
    <>
      <MeatballMenu items={meatballItems} />
    </>
  );
}
