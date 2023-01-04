import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import store from '../../store';
import ProjectList from '../ProjectList';
import { PROJECTS } from '../../store/init';
import ArtisanProject from '../ArtisanProject';
import Sidebar from '../Sidebar';
import WelcomeScreen from '../WelcomeScreen';

export default function AppView() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedList, setSelectedList] = useState([]);

  const [illos, setIllos] = useState([]);

  const [isArchive, setIsArchive] = useState(false);

  /**
   * Swaps between showing illustrations
   * from the store or fetched from the archive
   */
  useEffect(() => {
    (async () => {
      if (!isArchive && selectedProject) {
        const { illustrations } = await store.getProject(selectedProject);
        setIllos(illustrations);
      } else if (selectedProject) {
        setIllos(selectedProject.illos);
      }
    })();
  }, [selectedProject, isArchive]);

  /**
   * Updates illustration list on project or illustration change
   */
  useEffect(() => {
    if (!isArchive && selectedProject) {
      const unlisten = PROJECTS.onKeyChange(selectedProject, (e) => {
        const { illustrations } = e;
        setIllos(illustrations);
      });
      return () => {
        unlisten.then((f) => f());
      };
    }
    return () => {};
  }, [selectedProject, isArchive]);

  return (
    <>
      <div className={styles.emptyGrid}>
        <Sidebar>
          <ProjectList
            setIsArchive={setIsArchive}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            isArchive={isArchive}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        </Sidebar>
        <ArtisanProject
          isArchive={isArchive}
          selectedProject={selectedProject}
          illos={illos}
        />
      </div>
      <WelcomeScreen />
    </>
  );
}
