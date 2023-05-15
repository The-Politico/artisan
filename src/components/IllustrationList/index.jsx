import cls from 'classnames';
import { borders } from '../../theme';
import IllustrationItem from '../IllustrationItem';
import NewIllustration from '../NewIllustration';
import Skeleton from '../Skeleton';
import styles from './styles.module.css';
import atoms from '../../atoms';

export default function Illustrationlist() {
  const containerClass = cls(styles.container);
  const activeProject = atoms.use.activeProject();
  const illustrationsInProject = atoms.use.illustrationsInProject(
    activeProject,
  );

  // TODO: Skeleton rework?
  if (false) {
    return (
      <div className={containerClass}>
        <Skeleton
          className={cls(styles.skeleton, borders.roundedMd)}
          width="230px"
          height="180px"
        />
        <Skeleton
          className={cls(styles.skeleton, borders.roundedMd)}
          width="230px"
          height="180px"
        />
      </div>
    );
  }

  return (
    <div className={containerClass}>
      {illustrationsInProject.map((illoId) => (
        <IllustrationItem
          key={illoId}
          id={illoId}
        />
      ))}
      <NewIllustration projectId={activeProject} />
    </div>
  );
}
