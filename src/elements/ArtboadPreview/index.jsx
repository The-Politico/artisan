import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import styles from './styles.module.css';

export default function ArtboardPreview({
  projectName,
  projectSlug,
  embedUrl,
  selectedIllo,
}) {
  const [size, setSize] = useState(1);
  const sizes = ['mobile', 'medium', 'large'];

  const imgSrc = `${embedUrl}${projectSlug}/${selectedIllo.slug}/fallback_${sizes[size]}.png`;

  const back = () => {
    setSize((i) => (i === 0 ? sizes.length - 1 : i - 1));
  };

  const forward = () => {
    setSize((i) => (i === sizes.length - 1 ? 0 : i + 1));
  };

  return (
    <div className={styles.previewContainer}>
      <h3 className={styles.h3}>{selectedIllo.name}</h3>
      <div className={styles.sizeSelect}>
        <ArrowLeftCircleIcon
          className={styles.icon}
          onClick={() => back()}
        />
        <span>
          {`${sizes[size].charAt(0).toUpperCase() + sizes[size].slice(1)}`}
        </span>
        <ArrowRightCircleIcon
          className={styles.icon}
          onClick={() => forward()}
        />
      </div>
      <div className={styles.imgWrapper}>
        <img
          src={imgSrc}
          alt={`Artboard preview of ${selectedIllo.name} from project ${projectName}`}
        />
      </div>

    </div>
  );
}
