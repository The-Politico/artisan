import { useState, useEffect } from 'react';
import cls from 'classnames';
import TabToggle from '../TabToggle';
import {
  colors, flex, layout, margin, typography as type,
} from '../../theme';
import store from '../../store';
import { getProjectsArchive } from '../../actions';
import ListItems from './ListItems';

export default function ProjectList({
  setSelectedProject,
  isArchive = false,
  setIsArchive,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [projectsList, setProjectsList] = useState([]);
  const [archiveList, setArchivesList] = useState([]);

  useEffect(() => {
    (async () => {
      if (selectedIndex === 0) {
        const projects = await store.getProjectsList();
        setProjectsList(projects);
      } else {
        const archive = await getProjectsArchive();
        setArchivesList(archive);
      }
      setIsArchive(selectedIndex === 1);
    })();
  }, [selectedIndex]);

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
        <ListItems
          isArchive={isArchive}
          projectsList={projectsList}
          archiveList={archiveList}
          selectedIndex={selectedIndex}
          setSelectedProject={setSelectedProject}
        />
      </ul>
    </div>
  );
}
