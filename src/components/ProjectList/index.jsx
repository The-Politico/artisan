import { useState, useEffect } from 'react';
import cls from 'classnames';
import TabToggle from '../TabToggle';
import { colors, flex, layout, margin, typography as type } from '../../theme';
import styles from './styles.module.css';
import store from '../../store';
import { getProjectsArchive } from '../../actions';
import ProjectListItem from '../ProjectListItem';

export default function ProjectList({
  setSelectedProject,
  isArchive = false,
  setIsArchive,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    setIsArchive(selectedIndex === 1);
  }, [selectedIndex]);

  useEffect(() => {
    (async () => {
      if (!isArchive) {
        const projects = await store.getProjectsList();
        setProjectsList(projects);
      } else {
        const archive = await getProjectsArchive();
        console.log(archive);
        setProjectsList(archive);
      }
    })();
  }, [isArchive]);

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
          {isArchive ? 'Archive' : 'Projects'}
        </h4>
        <TabToggle
          items={tabItems}
          setSelectedIndex={setSelectedIndex}
          selectedIndex={selectedIndex}
        />
      </div>
      <ul>
        {projectsList.map((slug, idx) => (
          <ProjectListItem
            key={slug}
            projectSlug={slug}
            index={idx}
            last={idx === projectsList.at(-1)}
            isArchive={isArchive}
            setSelectedProject={setSelectedProject}
          />
        ))}
      </ul>
    </div>
  );
}
