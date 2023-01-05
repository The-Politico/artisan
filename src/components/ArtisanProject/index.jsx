import cls from 'classnames';
import styles from './styles.module.css';
import {
  flex, colors, borders, effects,
} from '../../theme';
import EmptyProject from '../EmptyProject';
import ProjectToolbar from '../ProjectToolbar';
import Illustrationlist from '../IllustrationList';

export default function ArtisanProject({ selectedProject, isArchive, illos }) {
  if (!selectedProject) {
    return <EmptyProject />;
  }

  return (
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
  );
}
