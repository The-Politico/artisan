import cls from 'classnames';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { flex, borders, colors, effects } from '../../theme';
import store from '../../store';
import ProjectToolbar from '../ProjectToolbar';
import CreateProject from '../CreateProjectButton';
import ProjectList from '../ProjectList';
import Logo from '../Logo';
import SettingsButton from '../SettingsButton';
import EmptyProject from '../EmptyProject';

export default function AppView() {
  const [selectedProject, setSelectedProject] = useState(null);

  const [illos, setIllos] = useState([]);

  const [isArchive, setIsArchive] = useState(false);

  const showSettings = false;

  useEffect(() => {
    (async () => {
      if (selectedProject) {
        const { illustrations } = await store.getProject(selectedProject);
        setIllos(illustrations);
      } else {
        setIllos([]);
      }
    })();
  }, [selectedProject]);

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
        <SettingsButton />
      </div>
      {selectedProject ? (
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
            {illos.map(({ name }) => (
              <span key={name}>{`* ${name}`}</span>
            ))}
          </div>
        </div>
      ) : (
        <EmptyProject />
      )}
    </div>
  );
}
