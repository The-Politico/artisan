import backupFiles from '../../actions/backupFiles';
import styles from './styles.module.css';

export default function BackupPrompt({ project }) {
  return (
    <button
      onClick={() => backupFiles(project)}
      type="button"
      className={styles.timestampBtn}
    >
      Backup now
    </button>
  );
}
