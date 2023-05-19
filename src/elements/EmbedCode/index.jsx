import CopyToClipboard from './CopyToClipboard';
import styles from './styles.module.css';

export default function EmbedCode({ embedUrl, selectedIllo, projectSlug }) {
  const embedRoot = `https://wwww.politico.com${embedUrl}/${projectSlug}/${selectedIllo.slug}/index.html`;
  return (
    <div className={styles.embedsContainer}>
      <h3 className={styles.h3}>CMS Embed Code</h3>
      <div className={styles.codeBlock}>
        {`<script async src="" /><div data-frame-src="${embedRoot}"></div>`}
        <CopyToClipboard />
      </div>
      <div className={styles.divider} />
      <h3 className={styles.h3}>Apple News</h3>
      <div className={styles.codeBlock}>
        {`<script async src="" /><div data-frame-src="${embedRoot}"></div>`}
        <CopyToClipboard />
      </div>
    </div>
  );
}
