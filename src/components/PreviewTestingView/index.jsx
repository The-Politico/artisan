import { useState } from 'react';
import styles from './styles.module.css';

import IllustrationPreview from '../IllustrationPreview';
import { NO_BREAKPOINT } from '../IllustrationPreview/_constants/breakpoints';

const testIllos = [
  { title: 'web-large', path: '/some/location/sample.ai' },
  { title: 'web-medium', path: '/some/location/sample2.ai' },
  { title: 'mobile-small', path: '/some/location/sample2.ai' },
];

export default function UITestingView() {
  // this is where we want to pass in a URL
  const [embedPreview, setEmbedPreview] = useState('hello');
  const [localURL, setLocalURL] = useState('http://localhost:8000/');
  const [embedType, setEmbedType] = useState('mobile');
  const [showArticle, setShowArticle] = useState(true);
  const [breakpoint, setBreakpoint] = useState(NO_BREAKPOINT.value);

  return (
    <div className={styles.view}>
      <IllustrationPreview
        breakpoint={breakpoint}
        embedType={embedType}
        showArticle={showArticle}
        url={localURL}
      >
        {/* {embedPreview} */}
      </IllustrationPreview>

    </div>
  );
}
