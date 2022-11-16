import { Popover } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import cls from 'classnames'
import Button from '../Button';
import { typography as type, margin } from '../../theme';
import styles from './styles.module.css';
import NewProjectPopover from '../NewProjectPopover';

export default function CreateProject() {
  return (
    <Popover className={cls(styles.popover, margin.mb4)}>
      <Popover.Button
        icon={<PlusIcon className={styles.icon} />}
        variant="solid"
        className={type.textXl}
        as={Button}
      >
        New Project
      </Popover.Button>
      <Popover.Overlay className={styles.overlay} />
      <NewProjectPopover />
    </Popover>
  );
}
