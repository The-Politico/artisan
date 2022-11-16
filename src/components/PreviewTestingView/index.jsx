import { useState, useRef } from 'react';
import styles from './styles.module.css';

import IllustrationPreview from '../IllustrationPreview';
import PreviewToolbar from '../PreviewToolbar';
import { NO_BREAKPOINT } from '../IllustrationPreview/_constants/breakpoints';

const illoList = [
  { title: 'web-large', path: '/some/location/sample.ai' },
  { title: 'web-medium', path: '/some/location/sample2.ai' },
  { title: 'mobile-small', path: '/some/location/sample2.ai' },
];

const embedList = [
  { title: 'standard', path: '1' },
  { title: 'bump-in', path: '2' },
  { title: 'bump-out', path: '3' },
  { title: 'browser-width', path: '4' },
  { title: 'browser-width-full', path: '5' },
  { title: 'page-width', path: '6' },
];

const screenSizes = [
  'ComputerDesktopIcon',
  'DevicePhoneMobileIcon',
  'DeviceTabletIcon',
];

export default function UITestingView() {
  const iframeRef = useRef(null);
  const [localURL, setLocalURL] = useState('http://localhost:8000/');
  const [showArticle, setShowArticle] = useState(true);
  const [breakpoint, setBreakpoint] = useState(NO_BREAKPOINT.value);
  const [embedType, setEmbedType] = useState(embedList[0]);
  const [illo, setIllo] = useState(illoList[0]);
  const [screenSize, setScreenSize] = useState(0);

  return (
    <div className={styles.view}>
      <PreviewToolbar
        illoList={illoList}
        illo={illo}
        setIllo={setIllo}
        embedList={embedList}
        embedType={embedType}
        setEmbedType={setEmbedType}
        showArticle={showArticle}
        setShowArticle={setShowArticle}
        selectedIndex={screenSize}
        setSelectedIndex={setScreenSize}
        items={screenSizes}
      />
      <IllustrationPreview
        breakpoint={breakpoint}
        embedType={embedType.title}
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
