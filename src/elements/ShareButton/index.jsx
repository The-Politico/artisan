import { useState } from 'react';
import cls from 'classnames';
import { CheckIcon, LinkIcon } from '@heroicons/react/24/solid';
import styles from './styles.module.css';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    const url = window.location;
    try {
      await window.navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.buttonContainer}>
      <h3 className={styles.buttonLabel}>
        {!copied ? 'Copy page link' : 'Copied to clipboard!'}
      </h3>
      <button
        className={cls(styles.linkButton, { [styles.copied]: copied })}
        type="button"
        onClick={handleClick}
      >
        {!copied ? (
          <LinkIcon className={styles.icon} />
        ) : (
          <CheckIcon className={styles.icon} />
        )}
      </button>
    </div>
  );
}
