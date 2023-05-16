import cls from 'classnames';
import styles from './styles.module.css';
import { typography as type } from '../../theme';
import Timestamp from './Timestamp';
import BackupPrompt from './BackupPrompt';
import atoms from '../../atoms';
import {
  STATUS_PROJECT_OK,
  STATUS_PROJECT_VALID_UPLOAD,
} from '../../constants/statuses';

/**
 * Timestamp information dek for active Project.
 * Also provides option to backup
 * @param {Object} props
 * @param {String} [props.id] The project whose status to retrieve
 * @returns {JSX.Element}
 */
export default function ProjectStatusDek({ id }) {
  const status = atoms.useRecoilValue(
    atoms.status(id),
  );

  const lastUploaded = atoms.useRecoilValue(
    atoms.projectLastUploaded(id),
  );

  const dekClass = cls(styles.dek, type.textSm);

  if (status === 'archive') {
    return <div className={dekClass}>Download to start editing</div>;
  }

  const renderText = () => {
    // TODO: Status rework
    switch (status) {
      case STATUS_PROJECT_OK:
        return 'Last backed up: ';
      case STATUS_PROJECT_VALID_UPLOAD:
        return 'Not backed up: ';
      default:
        return 'Unknown Status Text: ';
    }
  };

  const renderTime = () => {
    if (status === STATUS_PROJECT_VALID_UPLOAD) {
      return <BackupPrompt id={id} />;
    }

    return (
      <Timestamp
        status={status}
        timestamp={lastUploaded}
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
