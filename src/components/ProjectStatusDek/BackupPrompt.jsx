import { backupFilesS3 } from '../../actions/backup';
import styles from './styles.module.css';

export default function BackupPrompt({ project }) {
  return (
    <button
      onClick={() => backupFilesS3(project)}
      type="button"
      className={styles.timestampBtn}
    >
      Backup now
    </button>
  );
}
