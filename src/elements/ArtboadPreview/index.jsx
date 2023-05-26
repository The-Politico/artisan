import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import styles from './styles.module.css';
import { AWS_STAGING_BASE_URL } from '../../constants/aws';

export default function ArtboardPreview({
  projectId,
  embedUrl,
  selectedIllo,
}) {
  const [size, setSize] = useState(1);
  const sizes = ['small', 'medium', 'large'];
  const len = sizes.length - 1;

  const imgSrc = `${AWS_STAGING_BASE_URL}${embedUrl}/${projectId}/${selectedIllo}/${selectedIllo}-${sizes[size]}.png`;

  const back = () => {
    setSize((i) => (i === 0 ? len : i - 1));
  };

  const forward = () => {
    setSize((i) => (i === len ? 0 : i + 1));
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
          alt={`Artboard preview of ${selectedIllo} from project ${projectId}`}
        />
      </div>

    </div>
  );
}
