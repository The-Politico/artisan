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
  const [embedPreview, setEmbedPreview] = useState('hello');
  const [embedType, setEmbedType] = useState('standard');
  const [showArticle, setShowArticle] = useState(false);
  const [breakpoint, setBreakpoint] = useState(NO_BREAKPOINT.value);

  return (
    <div className={styles.view}>
      <IllustrationPreview
        breakpoint={breakpoint}
        embedType={embedType}
        showArticle={showArticle}
      >
        {embedPreview}
      </IllustrationPreview>

    </div>
  );
}
