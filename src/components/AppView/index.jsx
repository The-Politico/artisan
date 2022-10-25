import cls from 'classnames';
import { PlusIcon } from '@heroicons/react/20/solid';
import { Menu, Tab } from '@headlessui/react';
import { useState } from 'react';
import styles from './styles.module.css';
import { flex, spacing, typography as type, gap } from '../../theme';
import IconButton from '../IconButton';
import ProjectStatusIcon from '../ProjectStatusIcon';
import ProjectStatusDek from '../ProjectStatusDek';
import Button from '../Button';
import MeatballItem from '../MeatballItem';
import { getStoreValue } from '../../store';
import TabToggleItem from '../TabToggleItem';

export default function AppView() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndex2, setSelectedIndex2] = useState(0);

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

  return (
    <div className={classNames}>
      <div className={cls(flex.flex, spacing.x4)}>
        <Button variant="ghost">Ghost button</Button>
        <Button variant="outline">Outline button</Button>
        <Button
          variant="solid"
          value="Solid w/ icon"
          className={type.textXl}
          icon={<PlusIcon className={styles.icon} />}
        />
      </div>
      <div className={cls(flex.flex, flex.flexCenter, gap.x4)}>
        <div className={styles.groupBg}>
          <IconButton
            iconName="GlobeAltIcon"
            label="Publish"
            setWhite
          />
        </div>
        <IconButton
          iconName="EyeIcon"
          label="Preview"
        />
      </div>
      <div className={styles.statusIcons}>
        <ProjectStatusIcon />
        <ProjectStatusIcon status="published" />
        <ProjectStatusIcon status="archive" />
        <ProjectStatusIcon size="lg" />
        <ProjectStatusIcon
          status="published"
          size="lg"
        />
        <ProjectStatusIcon
          status="archive"
          size="lg"
        />
      </div>
      <div>
        <ProjectStatusDek />
        <ProjectStatusDek status="archive" />
        <ProjectStatusDek
          status="published"
          timestamp="2022-10-24T18:23:42.536Z"
        />
        <ProjectStatusDek
          status="uploaded"
          timestamp="2022-10-22T18:23:42.536Z"
        />
      </div>
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
      <Tab.Group
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      >
        <Tab.List className={cls(styles.tabList)}>
          <TabToggleItem iconName="DocumentIcon" />
          <TabToggleItem iconName="ArchiveBoxIcon" />
          <span
            style={{
              '--translate': selectedIndex,
            }}
            className={cls(styles.glider)}
          />
        </Tab.List>
      </Tab.Group>
      <Tab.Group
        selectedIndex={selectedIndex2}
        onChange={setSelectedIndex2}
        as="div"
        className={styles.groupBg}
      >
        <Tab.List className={cls(styles.tabList, styles.transparentBg)}>
          <TabToggleItem
            size="24"
            iconName="ComputerDesktopIcon"
          />
          <TabToggleItem
            size="24"
            iconName="DevicePhoneMobileIcon"
          />
          <TabToggleItem
            size="24"
            iconName="DeviceTabletIcon"
          />
          <span
            style={{
              '--translate': selectedIndex2,
            }}
            className={cls(styles.glider)}
          />
        </Tab.List>
      </Tab.Group>
    </div>
  );
}
