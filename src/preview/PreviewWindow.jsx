import { useState, useRef, useEffect } from 'react';
import cls from './styles.module.css';

import store from '../store';
import getIllosFromProject from '../utils/fs/getIllosFromProject';

function PreviewWindow() {
  const [url, setURL] = useState();
  const [illos, setIllos] = useState(null);
  const iframeRef = useRef(null);

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
