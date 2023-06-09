import cls from 'classnames';
import { useMemo } from 'react';
import atoms from '../../atoms';
import {
  STATUS_PROJECT_CHANGES,
  STATUS_PROJECT_DRAFT,
  STATUS_PROJECT_PUBLISHED,
} from '../../constants/statuses';
import { typography as type } from '../../theme';
import Timestamp from './Timestamp';
import styles from './styles.module.css';

/**
 * Timestamp information dek for active Project.
 * Also provides option to backup
 * @param {Object} props
 * @param {String} [props.id] The project whose status to retrieve
 * @returns {JSX.Element}
 */
export default function ProjectStatusDek({ id }) {
  const pubStatus = atoms.useRecoilValue(atoms.projectPublishedStatus(id));
  const lastUpdated = atoms.useRecoilValue(atoms.projectLastUpdated(id));

  const dekClass = cls(styles.dek, type.textSm);

  const statusText = useMemo(() => {
    switch (pubStatus) {
      case STATUS_PROJECT_DRAFT:
        return 'This project has not been published';
      case STATUS_PROJECT_PUBLISHED:
        return 'Last published: ';
      case STATUS_PROJECT_CHANGES:
        return 'Last updated: ';
      default:
        return 'Project status unknown';
    }
  }, [pubStatus]);

  return (
    <div className={dekClass}>
      <span>{statusText}</span>
      <Timestamp
        status={pubStatus}
        timestamp={lastUpdated}
      />
    </div>
  );
}
