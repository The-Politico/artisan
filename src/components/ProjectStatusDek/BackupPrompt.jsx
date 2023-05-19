import useBackupProject from '../../hooks/useBackupProject';
import styles from './styles.module.css';

export default function BackupPrompt({ id }) {
  const backup = useBackupProject(id);

  return (
    <button
      onClick={backup}
      type="button"
      className={styles.timestampBtn}
    >
      Backup now
    </button>
  );
}
