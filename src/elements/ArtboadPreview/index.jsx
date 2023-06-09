import styles from './styles.module.css';
import {
  AWS_PRODUCTION_BASE_URL,
  AWS_STAGING_BASE_URL,
} from '../../constants/aws';
import slugify from '../../utils/text/slugify';
import { FALLBACK_IMG_NAME } from '../../constants/paths';
import slugifyOutput from '../../utils/text/slugifyOuput';

export default function ArtboardPreview({
  projectId,
  embedUrl,
  selectedIllo,
}) {
  const projectSlug = slugify(projectId);
  const illoSlug = slugify(selectedIllo);
  const illoFileSlug = slugifyOutput(selectedIllo);

  const embedRoot = `${AWS_PRODUCTION_BASE_URL}${embedUrl}/${projectSlug}/${illoSlug}/${illoFileSlug}.html`;
  const imgSrc = `${AWS_STAGING_BASE_URL}${embedUrl}/${projectSlug}/${illoSlug}/${FALLBACK_IMG_NAME}`;

  return (
    <div className={styles.previewContainer}>
      <h3 className={styles.h3}>{selectedIllo}</h3>
      <div className={styles.imgWrapper}>
        <img
          src={imgSrc}
          alt={`Artboard preview of ${selectedIllo} from project ${projectId}`}
        />
      </div>
      <div className={styles.outputLink}>
        <a href={embedRoot}>See live preview</a>
      </div>
    </div>
  );
}
