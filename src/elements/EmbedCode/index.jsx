import styles from './styles.module.css';

export default function EmbedCode() {
  return (
    <div className={styles.embedsContainer}>
      <h3 className={styles.h3}>CMS Embed Code</h3>
      <div className={styles.codeBlock}>
        {/* <CopyToClipboard /> */}
      </div>
      <div className={styles.divider} />
      <h3 className={styles.h3}>Google AMP</h3>
      <div className={styles.codeBlock}>
        {/* <CopyToClipboard /> */}
      </div>
      <div className={styles.divider} />
      <h3 className={styles.h3}>Apple News</h3>
      <div className={styles.codeBlock}>
        {/* <CopyToClipboard /> */}
      </div>
    </div>
  );
}
