import { useState, useRef, useEffect } from 'react';
import cls from './styles.module.css';
import idToSlugs from '../utils/ids/idToSlugs';
import getLocalPreviewUrl from '../utils/paths/getLocalPreviewUrl';

import store from '../store';

function PreviewWindow() {
  const [url, setURL] = useState();
  const [illos, setIllos] = useState(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    async function getSlugs() {
      const project = await store.preview.get('project');

      const illoEntries = await store.entities.get();
      const illoIds = illoEntries
        .map(([id]) => id)
        .filter((id) => {
          const slugs = idToSlugs(id);
          return slugs.project === project;
        });

      const firstIllo = illoIds[0];

      const localPreviewUrl = await getLocalPreviewUrl(firstIllo);

      setIllos(illoIds);
      setURL(localPreviewUrl);
    }

    getSlugs();
  }, []);

  // placeholder for when we want to create a dropdown of illos later
  // eslint-disable-next-line no-console
  console.log(illos);
  console.log(url);

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
