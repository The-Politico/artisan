import {
  useEffect, useRef,
  useState,
} from 'react';
import { appWindow } from '@tauri-apps/api/window';
import { ALL_TYPES as EMBED_TYPES } from './_constants/embedTypes';

import ensureMeta from './_utils/ensureMeta';
import ensureStyles from './_utils/ensureStyles';
import runInjectedScripts from './_utils/runInjectedScripts';

import DevicePreview from './DevicePreview';

import styles from './styles.module.css';

export default function IllustrationPreview(props) {
  const {
    breakpoint,
    showArticle = true,
    embedType = 'standard',
    children,
  } = props;

  const frame = useRef();
  const [windowHeight, setWindowHeight] = useState(500);

  useEffect(() => {
    if (frame.current) {
      const doc = frame.current.contentWindow.document;
      doc.location.reload(true);

      setTimeout(() => {
        const docObj = frame.current.contentWindow.document;
        const { body } = docObj;
        body.innerHTML = EMBED_TYPES[embedType]({ children, showArticle });
        body.style.margin = '0';

        ensureMeta(frame);
        ensureStyles(frame);
        runInjectedScripts(frame);
      }, 1000);
    }

    async function getSize() {
      const factor = await appWindow.scaleFactor();
      const size = await appWindow.innerSize();
      const logical = size.toLogical(factor);
      const adjustedHeight = logical.height - (45 * factor);
      setWindowHeight(adjustedHeight);
    }

    getSize();
  }, [embedType, children, showArticle, breakpoint]);
  return (
    <div className={styles.livePreview}>
      <div
        className={styles.componentContainer}
      >
        <DevicePreview breakpoint={breakpoint}>
          <iframe
            scrolling="yes"
            title="live-preview-frame"
            className={styles.livePreviewFrame}
            ref={frame}
            frameBorder="0"
            width="100%"
            height={windowHeight}
          >
            {children}
          </iframe>
        </DevicePreview>
      </div>
    </div>
  );
}
