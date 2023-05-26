import { useState } from 'react';
import styles from './styles.module.css';
import ExportToolbar from '../ExportToolbar';
import ArtboardPreview from '../ArtboadPreview';
import EmbedCode from '../EmbedCode';

export default function ExportPage({ config }) {
  const illosList = config.illos;
  const [selectedIllo, setSelectedIllo] = useState(illosList[0]);

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
        <EmbedCode
          selectedIllo={selectedIllo}
          projectId={config.projectId}
          embedUrl={config.embedUrl}
        />
      </div>
    </div>
  );
}
