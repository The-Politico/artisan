import cls from 'classnames';
import { useState, useEffect } from 'react';
import { borders } from '../../theme';
import IllustrationItem from '../IllustrationItem';
import NewIllustration from '../NewIllustration';
import Skeleton from '../Skeleton';
import styles from './styles.module.css';

export default function Illustrationlist({
  illos,
  selectedProject,
  isArchive,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const containerClass = cls(styles.container);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [selectedProject]);

  if (isLoading) {
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
