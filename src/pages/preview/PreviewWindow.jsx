import { useState, useEffect } from 'react';
import ids from '../../utils/ids';
import getLocalPreviewUrl from '../../utils/paths/getLocalPreviewUrl';

import store from '../../store';
import styles from './styles.module.css';
import IllustrationPreview from '../../components/IllustrationPreview';
import PreviewToolbar from '../../components/PreviewToolbar';

import {
  NO_BREAKPOINT,
  MOBILE_PORTRAIT,
  TABLET_PORTRAIT,
} from '../../components/IllustrationPreview/_constants/breakpoints';

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
  const [showArticle, setShowArticle] = useState(false);
  const [breakpoint, setBreakpoint] = useState(0);
  const [embedType, setEmbedType] = useState(embedList[0]);
  const [url, setURL] = useState();
  const [illos, setIllos] = useState(null);
  const [selectedIllo, setSelectedIllo] = useState(null);

  useEffect(() => {
    (async function effect() {
      const project = await store.preview.get('project');

      const illoEntries = await store.illustrations.get();
      const illoIds = illoEntries
        .filter(([id]) => {
          const { project: compareId } = ids.parse(id);
          return compareId === project;
        })
        .map(([id]) => {
          const { illustration } = ids.parse(id);
          return illustration;
        });

      const firstIllo = illoIds[0];

      setIllos(illoIds);
      setSelectedIllo(firstIllo);
    }());
  }, []);

  useEffect(() => {
    (async function effect() {
      if (selectedIllo) {
        const localPreviewUrl = await getLocalPreviewUrl(selectedIllo);
        setURL(localPreviewUrl);
      }
    }());
  }, [selectedIllo]);

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
        setTimeout(() => {
          window.newswireFrames.autoInitFrames();
        }, 1000);


        </script>
      `}
      </IllustrationPreview>

    </div>
  );
}

export default PreviewWindow;
