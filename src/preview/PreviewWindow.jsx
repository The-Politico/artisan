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
  'standard',
  'bump-in',
  'bump-out',
  'browser-width',
  'browser-width-full',
  'page-width',
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
  const [showArticle, setShowArticle] = useState(true);
  const [breakpoint, setBreakpoint] = useState(0);
  const [embedType, setEmbedType] = useState(embedList[0]);
  const [url, setURL] = useState();
  const [illos, setIllos] = useState(null);
  const [selectedIllo, setSelectedIllo] = useState(null);

  useEffect(() => {
    async function getSlugs() {
      const { project, port } = await store.getPreview();
      const illoSlugs = await getIllosFromProject(project);
      let illoURL = '';

      if (selectedIllo) {
        illoURL = `http://localhost:${port}/${selectedIllo}/`
        + 'ai2html-output/index.html';
      } else {
        illoURL = `http://localhost:${port}/${illoSlugs[0]}/`
        + 'ai2html-output/index.html';
        setSelectedIllo(illoSlugs[0]);
      }
      setIllos(illoSlugs);
      setURL(illoURL);
    }

    getSlugs();
  }, [url, selectedIllo, embedType]);

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
        selectedIllo={selectedIllo}
        setSelectedIllo={setSelectedIllo}
        illoList={illos}
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
        embedType={embedType}
        showArticle={showArticle}
        url={url}
      >
        {`
        <div id="embed-preview" data-frame-src="${url}" data-frame-sandbox="allow-scripts allow-same-origin allow-top-navigation">

        </div>
        <script src="https://www.politico.com/interactives/cdn/js/frames.js"></script>
        <script>
        window.newswireFrames.autoInitFrames();
  

        </script>
      `}
      </IllustrationPreview>

    </div>
  );
}

export default PreviewWindow;
