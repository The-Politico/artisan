import { Suspense } from 'react';

import cls from 'classnames';
import styles from './styles.module.css';
import {
  flex, colors, borders, effects,
} from '../../theme';
import EmptyProject from '../EmptyProject';
import ProjectToolbar from '../ProjectToolbar';
import Illustrationlist from '../IllustrationList';
import IllustrationListSkeleton from '../IllustrationListSkeleton';
import ProjectToolbarSkeleton from '../ProjectToolbarSkeleton';
import atoms from '../../atoms';

export default function ArtisanProject() {
  const activeProject = atoms.useRecoilValue(
    atoms.activeProject,
  );

  if (!activeProject) {
    return <EmptyProject />;
  }

  return (
    <div className={styles.container}>
      <Suspense fallback={(<ProjectToolbarSkeleton />)}>
        <ProjectToolbar />
      </Suspense>
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
        <Suspense fallback={(<IllustrationListSkeleton />)}>
          <Illustrationlist />
        </Suspense>
      </div>
    </div>
  );
}
