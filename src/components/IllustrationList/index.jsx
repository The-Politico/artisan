import cls from 'classnames';
import IllustrationItem from '../IllustrationItem';
import NewIllustration from '../NewIllustration';
import styles from './styles.module.css';
import atoms from '../../atoms';

export default function Illustrationlist() {
  const containerClass = cls(styles.container);

  const activeProject = atoms.useRecoilValue(
    atoms.activeProject,
  );

  const illustrationsInProject = atoms.useRecoilValue(
    atoms.illustrationsInProject(activeProject),
  );

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
