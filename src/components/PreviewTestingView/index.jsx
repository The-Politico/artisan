import { useState, useRef } from 'react';
import styles from './styles.module.css';

import IllustrationPreview from '../IllustrationPreview';
import PreviewToolbar from '../PreviewToolbar';
import {
  NO_BREAKPOINT,
  MOBILE_PORTRAIT,
  TABLET_PORTRAIT,
} from '../IllustrationPreview/_constants/breakpoints';

const illoList = [
  { title: 'web-large', path: '/some/location/sample.ai' },
  { title: 'web-medium', path: '/some/location/sample2.ai' },
  { title: 'mobile-small', path: '/some/location/sample2.ai' },
];

const embedList = [
  { title: 'standard', path: '' },
  { title: 'bump-in', path: '' },
  { title: 'bump-out', path: '' },
  { title: 'browser-width', path: '' },
  { title: 'browser-width-full', path: '' },
  { title: 'page-width', path: '' },
];

const screenSizes = [
  'ComputerDesktopIcon',
  'DevicePhoneMobileIcon',
  'DeviceTabletIcon',
];

const breakpointsSubset = [
  NO_BREAKPOINT.value,
  MOBILE_PORTRAIT.value,
  TABLET_PORTRAIT.value,
];

export default function UITestingView() {
  const iframeRef = useRef(null);
  const localURL = 'http://localhost:8000/';
  const [showArticle, setShowArticle] = useState(true);
  const [breakpoint, setBreakpoint] = useState(0);
  const [embedType, setEmbedType] = useState(embedList[0]);
  const [illo, setIllo] = useState(illoList[0]);
  // this iframe is the actually illustration
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
        selectedIndex={breakpoint}
        setSelectedIndex={setBreakpoint}
        items={screenSizes}
      />
      <IllustrationPreview
        breakpoint={breakpointsSubset[breakpoint]}
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
