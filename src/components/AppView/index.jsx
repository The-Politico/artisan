import cls from 'classnames';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import {
  flex, spacing, borders, colors, effects,
} from '../../theme';
import store from '../../store';
import TabToggle from '../TabToggle';
import MeatballMenu from '../MeatballMenu';
import ProjectToolbar from '../ProjectToolbar';
import CreateProject from '../CreateProjectButton';
import ProjectList from '../ProjectList';
import Logo from '../Logo';
import SettingsPanel from '../SettingsPanel';

export default function AppView() {
  const [selectedProject, setSelectedProject] = useState('project-one');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndex2, setSelectedIndex2] = useState(0);

  const [illos, setIllos] = useState([]);

  const [isArchive, setIsArchive] = useState(false);

  const isToolbar = true;
  const showSettings = false;

  const classNames = cls(
    flex.flex,
    flex.flexCol,
    flex.flexCenter,
    spacing.y4,
    styles.hScreen,
  );

  async function doAction() {
    const f = await store.getProjects();
    console.log(f);
  }

  useEffect(() => {
    (async () => {
      const { illustrations } = await store.getProject(selectedProject);
      setIllos(illustrations);
    })();
  }, [selectedProject]);

  if (isToolbar) {
    return (
      <div className={styles.emptyGrid}>
        <div className={cls(styles.sidebar, flex.flex, flex.flexCol)}>
          <Logo />
          <CreateProject />
          <ProjectList
            setIsArchive={setIsArchive}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            isArchive={isArchive}
          />
          {showSettings && <SettingsPanel />}
        </div>
        <div className={styles.container}>
          <ProjectToolbar
            isArchive={isArchive}
            selectedProject={selectedProject}
          />
          <div
            className={cls(
              styles.illoContainer,
              flex.flex,
              flex.flexAuto,
              colors.bgWhite,
              borders.roundedLg,
              effects.shadowMd,
            )}
          >
            {illos.map(({ name }) => <span key={name}>{`* ${name}`}</span>)}
          </div>
        </div>
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

  const meatballItems = [
    {
      iconName: 'ServerIcon',
      label: 'Backup',
      action: () => doAction(),
    },
    {
      iconName: 'ArchiveBoxIcon',
      label: 'Archive',
      action: () => doAction(),
    },
    {
      iconName: 'FolderIcon',
      label: 'Open in Finder',
      action: () => doAction(),
    },
    {
      iconName: 'DocumentDuplicateIcon',
      label: 'Duplicate',
      action: () => doAction(),
    },
    {
      iconName: 'TrashIcon',
      label: 'Delete Project',
      action: () => doAction(),
      danger: true,
    },
  ];

  return (
    <div className={classNames}>
      <MeatballMenu items={meatballItems} />
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
