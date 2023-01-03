import cls from 'classnames';
import {
  CheckCircleIcon,
  DocumentPlusIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import styles from './styles.module.css';
import Input from '../Input';
import act from '../../actions';
import { flex, layout, margin, borders } from '../../theme';

export default function InputBox({ showInput, setShowInput, projectSlug }) {
  const [illoName, setIlloName] = useState('');

  const containerClass = cls(
    styles.container,
    borders.roundedLg,
    flex.flex,
    flex.flexCol,
    layout.itemsCenter,
    layout.justifyCenter,
    {
      [styles.inputMode]: showInput,
    },
  );

  const inputContainer = cls(
    styles.inputContainer,
    flex.flex,
    layout.itemsCenter,
    layout.justifyBetween,
  );

  const handleClick = async () => {
    if (illoName === '') {
      setShowInput(false);
      return;
    }
    await act.createIllustration(projectSlug, illoName);
    setShowInput(false);
  };

  return (
    <div className={containerClass}>
      <DocumentPlusIcon
        className={cls(styles.iconSize, styles.docIcon, margin.mt6)}
      />
      <div className={inputContainer}>
        <Input
          value={illoName}
          setValue={setIlloName}
          className={styles.input}
        />
        <button
          type="button"
          onClick={handleClick}
        >
          {illoName !== '' ? (
            <CheckCircleIcon className={styles.inputIcon} />
          ) : (
            <XCircleIcon className={styles.inputIcon} />
          )}
        </button>
      </div>
    </div>
  );
}