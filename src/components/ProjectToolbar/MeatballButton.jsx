import { useState } from 'react';
import useOpenProject from '../../hooks/useOpenProject';
// import useDuplicateProject from '../../hooks/useDuplicateProject';
import useDeleteProject from '../../hooks/useDeleteProject';

import MeatballMenu from '../MeatballMenu';
import DuplicatePopup from '../DuplicatePopup';

/**
 * @param {Object} props
 * @param {string} props.id - Parsed Project ID
 * @returns
 */
export default function MeatballButton({ id }) {
  const [showPopup, setShowPopup] = useState(false);
  const open = useOpenProject(id);
  const deleteProject = useDeleteProject(id);

  const meatballItems = [
    {
      iconName: 'FolderIcon',
      label: 'Open in Finder',
      action: open,
    },
    {
      iconName: 'DocumentDuplicateIcon',
      label: 'Duplicate',
      action: () => setShowPopup(true),
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
      <DuplicatePopup
        projectId={id}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
      />
    </>
  );
}
