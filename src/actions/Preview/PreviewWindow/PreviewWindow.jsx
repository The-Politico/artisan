import { useState, useRef, useEffect } from 'react';
import cls from './styles.module.css';

import { getStoreValue } from '../../../store';
import { PREVIEW_PORT } from '../../../constants/buckets';

import getLocalIlloSlugs from '../../../utils/get-local-illo-slugs';

const baseURL = `http://localhost:${PREVIEW_PORT}/`;

function PreviewWindow() {
  const [url, setURL] = useState(baseURL);
  const [illos, setIllos] = useState(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    async function getSlugs() {
      const projectSlug = await getStoreValue('active-project');
      const illoSlugs = await getLocalIlloSlugs(projectSlug);
      const illoURL = `http://localhost:${PREVIEW_PORT}/${illoSlugs[0]}/ai2html-output/index.html`;
      setIllos(illoSlugs);
      setURL(illoURL);
    }

    getSlugs();
  }, []);

  // placeholder for when we want to create a dropdown of illos later
  console.log(illos);

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
