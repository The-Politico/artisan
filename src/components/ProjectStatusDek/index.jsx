import cls from 'classnames';
import styles from './styles.module.css';
import { typography as type } from '../../theme';
import Timestamp from './Timestamp';
import BackupPrompt from './BackupPrompt';

/**
 * Timestamp information dek for active Project.
 * Also provides option to backup
 * @param {Object} props
 * @param {'archive' | 'published' | 'uploaded'} [props.status] Set status
 * to determine language. Defaults to "Not backedup: Backup Now"
 * @param {String} [props.timestamp] Timestamp formatted as an ISO datestring
 * @param {String} [props.projectSlug] Use to provide backup action
 * for unuploaded project
 * @returns {JSX.Element}
 */
export default function ProjectStatusDek({ status, timestamp, projectSlug }) {
  const dekClass = cls(styles.dek, type.textSm);

  if (status === 'archive') {
    return <div className={dekClass}>Download to start editing</div>;
  }

  const renderText = () => {
    switch (status) {
      case 'published':
        return 'Last published: ';
      case 'uploaded':
        return 'Last backed up: ';
      default:
        return 'Not backed up: ';
    }
  };

  const renderTime = () => {
    if (!timestamp) {
      return <BackupPrompt project={projectSlug} />;
    }
    return (
      <Timestamp
        status={status}
        timestamp={timestamp}
      />
    );
  };

  return (
    <div className={dekClass}>
      <span>{renderText()}</span>
      {renderTime()}
    </div>
  );
}
