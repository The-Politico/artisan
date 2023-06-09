import { useState } from 'react';
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/solid';
import styles from './styles.module.css';
import { copyToClipboard } from '../../utils/copyToClipboard';

export default function CopyToClipboard() {
  const [isCopied, setCopied] = useState(false);
  const handleClick = async ({ currentTarget }) => {
    const { parentElement } = currentTarget;
    const { firstChild } = parentElement;
    await copyToClipboard(firstChild.textContent, setCopied);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={styles.copyBtn}
    >
      {isCopied ? (
        <ClipboardDocumentCheckIcon className={`${styles.icon} ${styles.green}`} />
      ) : (
        <ClipboardDocumentIcon className={styles.icon} />
      )}
    </button>
  );
}
