import { useState } from 'react';
import styles from './styles.module.css';

import ArtisanSwitch from '../ArtisanSwitch';
import NewIllustration from '../NewIllustration';
import Dropdown from '../Dropdown';
import Input from '../Input';
import HelpButton from '../HelpButton';
import Logo from '../Logo';

const testIllos = [
  { title: 'web-large', path: '/some/location/sample.ai' },
  { title: 'web-medium', path: '/some/location/sample2.ai' },
  { title: 'mobile-small', path: '/some/location/sample2.ai' },
];

export default function UITestingView() {
  const [fname, setFname] = useState('');
  const [showArticle, setShowArticle] = useState(false);
  const [option, setDropdownOption] = useState(null);

  return (
    <div className={styles.view}>
      <br />
      <NewIllustration />
      <br />
      <ArtisanSwitch switchLabel="Show Article" setToggle={setShowArticle} />

      <Dropdown optionsList={testIllos} setOption={setDropdownOption} />
      <br />
      <br />
      <br />
      <br />
      <Input
        setTextInput={setFname}
        inputLabel="First Name"
        darkMode
      />

      <HelpButton />
      <br />

      <Logo />
    </div>
  );
}
