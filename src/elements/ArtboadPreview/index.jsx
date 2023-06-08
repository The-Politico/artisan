import styles from './styles.module.css';
import { AWS_STAGING_BASE_URL } from '../../constants/aws';
import slugify from '../../utils/text/slugify';
import { FALLBACK_IMG_NAME } from '../../constants/paths';

export default function ArtboardPreview({
  projectId,
  embedUrl,
  selectedIllo,
}) {
  const projectSlug = slugify(projectId);
  const illoSlug = slugify(selectedIllo);

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

    </div>
  );
}
