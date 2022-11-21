import { useState, useEffect } from 'react';
import cls from 'classnames';
import TabToggle from '../TabToggle';
import { colors, flex, layout, margin, typography as type } from '../../theme';
import store from '../../store';
import { getProjectsArchive } from '../../actions';
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

  useEffect(() => {
    (async () => {
      if (selectedIndex === 0) {
        const projects = await store.getProjectsList();
        setProjectsList(projects);
        setSelectedProject(projects[0]);
      } else {
        const archive = await getProjectsArchive();
        setArchivesList(archive);
        setSelectedProject(archive[0]);
      }
      setIsArchive(selectedIndex === 1);
    })();
  }, [selectedIndex]);

  useEffect(() => {
    setSelectedList(selectedIndex === 0 ? projectsList : archiveList);
  }, [projectsList, selectedIndex, archiveList]);

  useEffect(() => {
    const {
      stores: { PROJECTS },
    } = store;
    if (!isArchive) {
      const unlisten = PROJECTS.onKeyChange(selectedProject, (e) => {
        console.log('Selected project change in list', e);
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
          {isArchive ? 'Archive' : 'My Projects'}
        </h4>
        <TabToggle
          items={tabItems}
          setSelectedIndex={setSelectedIndex}
          selectedIndex={selectedIndex}
        />
      </div>
      <ul>
        {selectedList.map((item, idx) => (
          <ProjectListItem
            key={item.slug || item}
            projectSlug={typeof item === 'string' ? item : undefined}
            archiveProject={typeof item === 'object' ? item : undefined}
            index={idx}
            last={idx === selectedList.at(-1)}
            isArchive={isArchive}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
        ))}
      </ul>
    </div>
  );
}