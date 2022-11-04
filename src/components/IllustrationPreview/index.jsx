import {
  useEffect, useRef,
} from 'react';
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
    url,
    children,
  } = props;

  const frame = useRef();

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
  }, [embedType, children, showArticle]);

  return (
    <div className={styles['live-preview']}>
      <div
        className={styles['component-container']}
      >
        <DevicePreview breakpoint={breakpoint}>
          <iframe
            scrolling="yes"
            title="live-preview-frame"
            className={styles['live-preview-frame']}
            src={url}
            ref={frame}
            frameBorder="0"
            width="100%"
            height="500px"
          />
        </DevicePreview>
      </div>
    </div>
  );
}
