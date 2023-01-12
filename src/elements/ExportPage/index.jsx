import { useState } from 'react';
import styles from './styles.module.css';
import ExportToolbar from '../ExportToolbar';
import ArtboardPreview from '../ArtboadPreview';

export default function ExportPage({ config }) {
  const illosList = config.illos;
  const [selectedIllo, setSelectedIllo] = useState(illosList[0]);

  return (
    <div>
      <ExportToolbar
        illosList={illosList}
        selectedIllo={selectedIllo}
        setSelectedIllo={setSelectedIllo}
        projectName={config.projectName}
      />
      <div className={styles.container}>
        <ArtboardPreview
          {...config}
          selectedIllo={selectedIllo}
        />
      </div>
    </div>
  );
}
