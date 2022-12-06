import { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

import store from '../store';
import IllustrationPreview from '../components/IllustrationPreview';
import PreviewToolbar from '../components/PreviewToolbar';

import {
  NO_BREAKPOINT,
  MOBILE_PORTRAIT,
  TABLET_PORTRAIT,
} from '../components/IllustrationPreview/_constants/breakpoints';
import getIllosFromProject from '../utils/fs/getIllosFromProject';

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

function PreviewWindow() {
  const iframeRef = useRef(null);
  // const localURL = 'http://localhost:8000/';
  const [showArticle, setShowArticle] = useState(true);
  const [breakpoint, setBreakpoint] = useState(0);
  const [embedType, setEmbedType] = useState(embedList[0]);

  const [url, setURL] = useState();
  const [illos, setIllos] = useState(null);
  // const iframeRef = useRef(null);

  useEffect(() => {
    async function getSlugs() {
      const { project, port } = await store.getPreview();
      const illoSlugs = await getIllosFromProject(project);

      const illoURL = `http://localhost:${port}/${illoSlugs[0]}/`
        + 'ai2html-output/index.html';

      setIllos(illoSlugs);
      setURL(illoURL);
    }

    getSlugs();
  }, []);

  // placeholder for when we want to create a dropdown of illos later
  // eslint-disable-next-line no-console
  console.log(illos);

  if (!url) {
    return (
      <div>
        <h1>No Preview Running</h1>
        <p>Close this window and re-launch your preview</p>
      </div>
    );
  }

  return (
    <div className={styles.view}>
      <PreviewToolbar
        illoList={illos}
        setIllo={setIllos}
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
        url={url}
      >
        {`<iframe
          scrolling="no"
          width="100%"
          height="100%"
          class=${styles.embedFrame} 
          src=${url}
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

export default PreviewWindow;
