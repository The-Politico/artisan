import { useState } from 'react';
import styles from './styles.module.css';
import ExportToolbar from '../ExportToolbar';
import ArtboardPreview from '../ArtboadPreview';
import EmbedCode from '../EmbedCode';

import {
  STATUS_PROJECT_UNKNOWN,
  STATUS_PROJECT_PUBLISHED,
  STATUS_PROJECT_CHANGES,
} from '../../constants/statuses';

export default function ExportPage({ config }) {
  const illosList = config.illos;
  const [selectedIllo, setSelectedIllo] = useState(illosList[0]);

  if (config.projectStatus === STATUS_PROJECT_UNKNOWN) return null;

  return (
    <div>
      <ExportToolbar
        illosList={illosList}
        selectedIllo={selectedIllo}
        setSelectedIllo={setSelectedIllo}
        projectId={config.projectId}
      />
      <div className={styles.container}>
        <ArtboardPreview
          {...config}
          selectedIllo={selectedIllo}
        />

        {config.projectStatus === STATUS_PROJECT_PUBLISHED
        || config.projectStatus === STATUS_PROJECT_CHANGES ? (
          <EmbedCode
            selectedIllo={selectedIllo}
            projectId={config.projectId}
            embedUrl={config.embedUrl}
          />
          ) : null }
      </div>
    </div>
  );
}
