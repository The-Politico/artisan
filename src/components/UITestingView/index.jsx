import { PlusIcon } from '@heroicons/react/20/solid';
import Button from '../Button';
import styles from './styles.module.css';

import ArtisanSwitch from '../ArtisanSwitch';
import NewIllustration from '../NewIllustration';
import Dropdown from '../Dropdown';

const testIllos = [
  { title: 'web-large', path: '/some/location/sample.ai' },
  { title: 'web-medium', path: '/some/location/sample2.ai' },
  { title: 'mobile-small', path: '/some/location/sample2.ai' },
];

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
      <br />
      <Dropdown optionsList={testIllos} />
    </div>
  );
}
