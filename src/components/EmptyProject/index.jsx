import cls from 'classnames';
import { useEffect } from 'react';
import {
  borders,
  effects,
} from '../../theme';
import styles from './styles.module.css';

import ProjectToolbarSkeleton from '../ProjectToolbarSkeleton';
import IllustrationListSkeleton from '../IllustrationListSkeleton';
import atoms from '../../atoms';

/**
 * Render an empty frame to show no projects have been created yet
 * @returns {JSX.Element}
 */
export default function EmptyProject() {
  const setActiveProject = atoms.useSetRecoilState(
    atoms.activeProject,
  );

  const projectsList = atoms.useRecoilValue(
    atoms.projectsList,
  );

  useEffect(() => {
    if (projectsList.length > 0) {
      setActiveProject(projectsList[0]);
    }
  }, [projectsList]);

  return (
    <div className={styles.container}>
      <ProjectToolbarSkeleton />
      <div
        className={cls(
          styles.emptyProject,
          borders.roundedLg,
          effects.shadowMd,
        )}
      >
        <IllustrationListSkeleton />
      </div>
    </div>
  );
}
