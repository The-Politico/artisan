import React from 'react';

import { Head } from '@politico/interactive-style';
import EmbedPreview from './EmbedPreview';

import { pib as meta } from 'package.json';

import 'Theme/base.scss';

const { pages } = process.context;

const Preview = (props) => (
  <div className='preview'>
    <Head site={meta.site} />
    <EmbedPreview
      appName={meta.pageName}
      pages={pages}
      basePublishPath={meta.publishPath}
      embed={`<div id='test-embed' data-frame-src="https://www.politico.com/${meta.publishPath}" /><script src="//unpkg.com/@newswire/frames/dist/index.umd.js"></script><script>window.newswireFrames.autoInitFrames()</script>`}
    />
  </div>
);

export default Preview;

export { Helmet } from 'react-helmet';
