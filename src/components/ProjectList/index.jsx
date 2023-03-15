import { useState, useEffect } from 'react';
import cls from 'classnames';
import TabToggle from '../TabToggle';
import {
  colors, flex, layout, margin, typography as type,
} from '../../theme';
import store from '../../store';
import getProjectsArchive from '../../actions/getProjectsArchive';
import ProjectListItem from '../ProjectListItem';

export default function ProjectList({
  selectedProject,
  setSelectedProject,
  isArchive = false,
  setIsArchive,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [projectsList, setProjectsList] = useState([]);
  const [archiveList, setArchivesList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);

  // Determs whehter to show local projects or archive projcts
  useEffect(() => {
    (async () => {
      if (selectedIndex === 0) {
        const projects = await store.getProjectsList();
        setProjectsList([]);
        setSelectedProject(projects[0] || null);
      } else {
        const archive = await getProjectsArchive();
        setArchivesList(archive);
        setSelectedProject(archive[0]);
      }
      setIsArchive(selectedIndex === 1);
    })();
  }, [selectedIndex]);

  // Used to dertmined selected list to show
  // This is the two-lane highway
  // This doesn't rely on `isArchive` state
  // for performance and re-render reasons
  useEffect(() => {
    setSelectedList(selectedIndex === 0 ? projectsList : archiveList);
  }, [projectsList, selectedIndex, archiveList]);

  // Listens for changes in selected project.
  // Switches to first in list if one is deleted or doesn't exist
  useEffect(() => {
    const {
      stores: { PROJECTS },
    } = store;
    if (!isArchive) {
      const unlisten = PROJECTS.onKeyChange(selectedProject, (e) => {
        if (e === null) {
          setSelectedProject(projectsList[0]);
        }
      });
      return () => {
        unlisten.then((f) => f());
      };
    }
    return () => {};
  }, [selectedProject]);

  // Updates project list when new one is added
  useEffect(() => {
    const {
      stores: { STORE },
    } = store;

    const unlisten = STORE.onKeyChange('projects', (e) => {
      setProjectsList(e);
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  const tabItems = ['DocumentIcon', 'ArchiveBoxIcon'];

  return (
    <div>
      <div
        className={cls(
          flex.flex,
          layout.itemsCenter,
          layout.justifyBetween,
          margin.ml1,
          margin.mb2,
        )}
      >
        <h4
          className={cls(type.textLg, type.fontSemibold, colors.textSlate800)}
        >
          {!isArchive ? 'My Projects' : 'Archive'}
        </h4>
        <TabToggle
          items={tabItems}
          setSelectedIndex={setSelectedIndex}
          selectedIndex={selectedIndex}
        />
      </div>
      <ul>
        {selectedList.length > 0 && selectedList.map((item, idx) => (
          <ProjectListItem
            key={item.slug || item}
            projectSlug={typeof item === 'string' ? item : undefined}
            archiveProject={typeof item === 'object' ? item : undefined}
            index={idx}
            last={idx === selectedList[selectedList.length - 1]}
            isArchive={isArchive}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
        ))}
      </ul>
    </div>
  );
}
