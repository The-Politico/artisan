import { useRef } from 'react';
import cls from './styles.module.css';

function PreviewWindow() {
  const iframeRef = useRef(null);
  const url = 'http://localhost:8080';

  // right now, this naively serves up the directory the local
  // server was started in -- would be good to have an active-project
  // key in STORE so that we can use Tauri to grab the appropriate
  // ai2html-output directory paths for each illo.

  return (
    <>
      <h1>cms embed preview</h1>
      {/* <p>Child process {child?.pid}</p> */}
      <iframe
        ref={iframeRef}
        className={cls.iframe}
        src={url}
        frameBorder="0"
        title="embed-preview"
      />
    </>
  );
}

export default PreviewWindow;
