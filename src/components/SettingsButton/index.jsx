import { Popover } from '@headlessui/react';
import IconButton from '../IconButton';
import SettingsPopover from '../SettingsPopover';
import styles from './styles.module.css';

export default function SettingsButton() {
  return (
    <Popover className={styles.panelContainer}>
      <Popover.Button
        as={IconButton}
        iconName="Cog8ToothIcon"
      />
      <SettingsPopover />
    </Popover>
  );
}
