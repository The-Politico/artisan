import cls from 'classnames';
import styles from './styles.module.css';
import {
  flex, colors, borders, effects,
} from '../../theme';
import EmptyProject from '../EmptyProject';
import ProjectToolbar from '../ProjectToolbar';
import Illustrationlist from '../IllustrationList';
import atoms from '../../atoms';

export default function ArtisanProject() {
  const activeProject = atoms.use.activeProject();

  if (!activeProject) {
    return <EmptyProject />;
  }

  return (
    <div className={styles.container}>
      <ProjectToolbar />
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
        <div />
        <Illustrationlist />
      </div>
    </div>
  );
}
