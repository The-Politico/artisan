import cls from 'classnames';
import styles from './styles.module.css';
import { typography as type } from '../../theme';
import Timestamp from './Timestamp';
import atoms from '../../atoms';
import {
  STATUS_PROJECT_CHANGES,
  STATUS_PROJECT_DRAFT,
  STATUS_PROJECT_PUBLISHED,
} from '../../constants/statuses';

/**
 * Timestamp information dek for active Project.
 * Also provides option to backup
 * @param {Object} props
 * @param {String} [props.id] The project whose status to retrieve
 * @returns {JSX.Element}
 */
export default function ProjectStatusDek({ id }) {
  const pubStatus = atoms.useRecoilValue(atoms.publishedStatus(id));

  const lastChangedTime = atoms.useRecoilValue(
    atoms.projectLastPublishedChanged(id),
  );

  const dekClass = cls(styles.dek, type.textSm);

  // Old archive text
  // if (status === 'archive') {
  //   return <div className={dekClass}>Download to start editing</div>;
  // }

  const renderText = () => {
    switch (pubStatus) {
      case STATUS_PROJECT_DRAFT:
        return 'This project has not been published';
      case STATUS_PROJECT_PUBLISHED:
        return 'Last published: ';
      case STATUS_PROJECT_CHANGES:
        return 'Change since last publish: ';
      default:
        return 'Unknown Status Text: ';
    }
  };

  const renderTime = () => (
    <Timestamp
      status={pubStatus}
      timestamp={lastChangedTime}
    />
  );
  return (
    <div className={dekClass}>
      <span>{renderText()}</span>
      {renderTime()}
    </div>
  );
}
