import { PlusIcon } from '@heroicons/react/20/solid';
import Button from '../Button';
import styles from './styles.module.css';

import ArtisanSwitch from '../ArtisanSwitch';
import TestComponent from '../TestComponent';

export default function UITestingView() {
  return (
    <div className={styles.view}>
      <Button
        variant="solid"
        className="text-lg !text-red"
      >
        <PlusIcon className="h-6 mr-1" />
        {' '}
        New Project
      </Button>
      <br />
      <ArtisanSwitch switchLabel="Show Article" />
    </div>
  );
}
