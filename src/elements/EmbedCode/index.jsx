import { AWS_PRODUCTION_BASE_URL } from '../../constants/aws';
import CopyToClipboard from './CopyToClipboard';
import styles from './styles.module.css';
import { FALLBACK_IMG_NAME } from '../../constants/paths';
import slugify from '../../utils/text/slugify';

export default function EmbedCode({ embedUrl, selectedIllo, projectId }) {
  const projectSlug = slugify(projectId);
  const illoSlug = slugify(selectedIllo);

  const embedRoot = `${AWS_PRODUCTION_BASE_URL}${embedUrl}/${projectSlug}/${illoSlug}/${illoSlug}.html`;
  const fallbackUrl = `${AWS_PRODUCTION_BASE_URL}${embedUrl}/${projectSlug}/${illoSlug}/${FALLBACK_IMG_NAME}`;

  return (
    <div className={styles.embedsContainer}>
      <h3 className={styles.h3}>CMS Embed Code</h3>
      <div className={styles.codeBlock}>
        {`
<div id="${projectSlug}-embed-${illoSlug}" data-frame-src="${embedRoot}" data-frame-sandbox="allow-scripts allow-same-origin allow-top-navigation"></div>
<script src="https://www.politico.com/interactives/cdn/js/frames.js"></script>
<script>window.newswireFrames.autoInitFrames()</script>
        `.trim()}
        <CopyToClipboard />
      </div>
      <div className={styles.divider} />
      <h3 className={styles.h3}>Apple News</h3>
      <div className={styles.codeBlock}>
        {`
{
  "version": "1.7",
  "identifier": "Politico_generic_embed_00000172-7c22-dbeb-affe-fcbb816a0000",
  "title": "Generic Embed",
  "subtitle": null,
  "language": "en",
  "layout": null,
  "advertisingSettings": null,
  "metadata": null,
  "components": [
    {
      "role": "photo",
      "URL": "${fallbackUrl}",
      "accessibilityCaption": ""
    }
  ],
  "componentStyles": null,
  "textStyles": null,
  "componentTextStyles": null,
  "componentLayouts": null
}
        `.trim()}
        <CopyToClipboard />
      </div>
    </div>
  );
}
