import cls from 'classnames';
import styles from './styles.module.css';
import { typography as type } from '../../theme';
import Timestamp from './Timestamp';

export default function ProjectStatusDek({ status, timestamp, projectSlug }) {
  const dekClass = cls(styles.dek, type.textSm);

  if (status === 'archive') {
    return <div>Download to start editing</div>;
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

  return (
    <div className={dekClass}>
      <span>{renderText()}</span>
      <Timestamp
        status={status}
        timestamp={timestamp}
        project={projectSlug}
      />
    </div>
  );
}
