import cls from 'classnames';
import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import InputBox from './InputBox';
import styles from './styles.module.css';

import { colors, margin, borders, flex, layout, effects } from '../../theme';

export default function NewIllustration({ projectSlug }) {
  const [showInput, setShowInput] = useState(false);

  const containerClass = cls(
    styles.container,
    colors.bgSlate100,
    colors.textSlate400,
    borders.roundedLg,
    flex.flex,
    flex.flexCol,
    flex.flexCenter,
    layout.itemsCenter,
    effects.transition,
  );

  const iconClass = cls(margin.mb4, styles.iconSize);

  if (!showInput) {
    return (
      <button
        type="button"
        className={containerClass}
        onClick={() => setShowInput(true)}
      >
        <PlusIcon className={iconClass} />
        <p>Create</p>
      </button>
    );
  }

  return (
    <InputBox
      showInput={showInput}
      setShowInput={setShowInput}
      projectSlug={projectSlug}
    />
  );
}
