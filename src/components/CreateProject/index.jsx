import { PlusIcon } from '@heroicons/react/24/solid';
import Button from '../Button';
import { typography as type } from '../../theme';
import styles from './styles.module.css';

export default function CreateProject() {
  return (
    <Button
      className={type.textXl}
      variant="solid"
      icon={<PlusIcon className={styles.icon} />}
      value="New Project"
    />
  );
}
