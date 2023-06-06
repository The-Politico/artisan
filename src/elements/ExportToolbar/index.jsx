import Dropdown from '../Dropdown';
import ShareButton from '../ShareButton';
import styles from './styles.module.css';

export default function ExportToolbar({
  illosList,
  selectedIllo,
  setSelectedIllo,
  projectId,
}) {
  return (
    <div className={styles.toolbar}>
      <Dropdown
        illosList={illosList}
        selectedIllo={selectedIllo}
        setSelectedIllo={setSelectedIllo}
      />
      <h2 className={styles.h2}>{projectId}</h2>
      <ShareButton />
    </div>

  );
}
