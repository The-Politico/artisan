import { PlusIcon } from '@heroicons/react/20/solid';
import Button from '../Button';
import styles from './styles.module.css';

import ArtisanSwitch from '../ArtisanSwitch';
import NewIllustration from '../NewIllustration';

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
      <NewIllustration />
      <br />
      <ArtisanSwitch switchLabel="Show Article" />
    </div>
  );
}
