import { useState, useRef } from 'react';
import styles from './styles.module.css';

import IllustrationPreview from '../IllustrationPreview';
import { NO_BREAKPOINT } from '../IllustrationPreview/_constants/breakpoints';

const testIllos = [
  { title: 'web-large', path: '/some/location/sample.ai' },
  { title: 'web-medium', path: '/some/location/sample2.ai' },
  { title: 'mobile-small', path: '/some/location/sample2.ai' },
];

export default function UITestingView() {
  const iframeRef = useRef(null);
  const [localURL, setLocalURL] = useState('http://localhost:8000/');
  const [embedType, setEmbedType] = useState('standard');
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
        {`<iframe
          scrolling="no"
          width="100%"
          height="100%"
          class=${styles.embedFrame} 
          src=${localURL}
          ref=${iframeRef}
          frameBorder="0"
          title="embed-preview"
          sandbox="allow-scripts allow-same-origin allow-top-navigation"
        ></iframe>
        <script>window.newswireFrames.autoInitFrames();</script>
      `}
      </IllustrationPreview>

    </div>
  );
}
