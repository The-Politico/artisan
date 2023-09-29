import styles from './styles.module.css';
import {
  AWS_PRODUCTION_BASE_URL,
  AWS_STAGING_BASE_URL,
} from '../../constants/aws';
import slugify from '../../utils/text/slugify';
import { FALLBACK_IMG_NAME } from '../../constants/paths';
import slugifyOutput from '../../utils/text/slugifyOuput';

import {
  STATUS_PROJECT_DRAFT,
  STATUS_PROJECT_PUBLISHED,
  STATUS_PROJECT_CHANGES,
} from '../../constants/statuses';

export default function ArtboardPreview({
  projectId,
  embedUrl,
  selectedIllo,
  projectStatus,
}) {
  const projectSlug = slugify(projectId);
  const illoSlug = slugify(selectedIllo);
  const illoFileSlug = slugifyOutput(selectedIllo);

  const liveLink = `${AWS_PRODUCTION_BASE_URL}${embedUrl}/${projectSlug}/${illoSlug}/${illoFileSlug}.html`;
  const stagingLink = `${AWS_STAGING_BASE_URL}${embedUrl}/${projectSlug}/${illoSlug}/${illoFileSlug}.html`;
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
        {projectStatus === STATUS_PROJECT_DRAFT
        || projectStatus === STATUS_PROJECT_CHANGES
          ? (<a href={stagingLink}>See staged</a>) : null}
        <br />
        {projectStatus === STATUS_PROJECT_PUBLISHED
        || projectStatus === STATUS_PROJECT_CHANGES
          ? (
            <a href={liveLink}>See published</a>
          ) : null}
      </div>
    </div>
  );
}
