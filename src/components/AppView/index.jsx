import cls from 'classnames';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import {
  flex, borders, colors, effects,
} from '../../theme';
import store from '../../store';
import ProjectToolbar from '../ProjectToolbar';
import CreateProject from '../CreateProjectButton';
import ProjectList from '../ProjectList';
import Logo from '../Logo';
import SettingsButton from '../SettingsButton';
import EmptyProject from '../EmptyProject';
import { PROJECTS } from '../../store/init';
import Illustrationlist from '../IllustrationList';

export default function AppView() {
  const [selectedProject, setSelectedProject] = useState(null);

  const [illos, setIllos] = useState([]);

  const [isArchive, setIsArchive] = useState(false);

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

  useEffect(() => {
    if (!isArchive) {
      const unlisten = PROJECTS.onKeyChange(selectedProject, (e) => {
        const { illustrations } = e;
        setIllos(illustrations);
      });
      return () => {
        unlisten.then((f) => f());
      };
    }
    setIllos([]);
  }, [selectedProject, isArchive]);

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
            <Illustrationlist
              illos={illos}
              selectedProject={selectedProject}
              isArchive={isArchive}
            />
          </div>
        </div>
      ) : (
        <EmptyProject />
      )}
    </div>
  );
}
