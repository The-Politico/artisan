import cls from 'classnames';
import { Menu } from '@headlessui/react';
import { useState } from 'react';
import styles from './styles.module.css';
import { flex, spacing } from '../../theme';
import MeatballItem from '../MeatballItem';
import { getStoreValue } from '../../store';
import EmptyProject from '../EmptyProject';
import TabToggle from '../TabToggle';

export default function AppView() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndex2, setSelectedIndex2] = useState(0);

  const isEmpty = false;

  const classNames = cls(
    flex.flex,
    flex.flexCol,
    flex.flexCenter,
    spacing.y4,
    styles.hScreen,
  );

  async function doAction() {
    const f = await getStoreValue('projects');
    console.log(f);
  }

  if (isEmpty) {
    return (
      <div className={styles.emptyGrid}>
        <div />
        <EmptyProject />
      </div>
    );
  }

  const tabItems = [
    { iconName: 'DocumentIcon', mode: 'local' },
    { mode: 'archive', iconName: 'ArchiveBoxIcon' },
  ];

  const screenSizes = [
    { iconName: 'ComputerDesktopIcon', mode: 'desktop' },
    { iconName: 'DevicePhoneMobileIcon', mode: 'mobile' },
    { iconName: 'DeviceTabletIcon', mode: 'tablet' },
  ];

  return (
    <div className={classNames}>
      <Menu as="div">
        <MeatballItem
          iconName="ServerIcon"
          label="Backup"
          action={() => doAction()}
        />
        <MeatballItem
          iconName="ArchiveBoxIcon"
          label="Archive"
        />
        <MeatballItem
          iconName="FolderIcon"
          label="Open in Finder"
        />
        <MeatballItem
          iconName="DocumentDuplicateIcon"
          label="Duplicate"
        />
        <MeatballItem
          iconName="TrashIcon"
          label="Delete Project"
          danger
        />
      </Menu>
      <TabToggle
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        items={tabItems.map(({ iconName }) => iconName)}
      />
      <p>{`Project list to show: ${tabItems[selectedIndex].mode}`}</p>
      <div className={styles.groupBg}>
        <TabToggle
          selectedIndex={selectedIndex2}
          setSelectedIndex={setSelectedIndex2}
          items={screenSizes.map(({ iconName }) => iconName)}
          size="24"
          transparent
        />
      </div>
      <p>{`Device selected: ${screenSizes[selectedIndex2].mode}`}</p>
    </div>
  );
}
