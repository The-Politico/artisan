import cls from 'classnames';
import IllustrationItem from '../IllustrationItem';
import NewIllustration from '../NewIllustration';
import styles from './styles.module.css';

export default function Illustrationlist({
  illos,
  selectedProject,
  isArchive,
}) {
  const containerClass = cls(styles.container);

  return (
    <div className={containerClass}>
      {illos.map(({ name, slug, publicUrl }) => (
        <IllustrationItem
          projectSlug={selectedProject}
          key={name}
          name={name}
          slug={slug}
          publicURL={publicUrl}
          isArchive={isArchive}
        />
      ))}
      {!isArchive && <NewIllustration projectSlug={selectedProject} />}
    </div>
  );
}
