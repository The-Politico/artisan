import cls from 'classnames';
import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import InputBox from './InputBox';
import styles from './styles.module.css';
import { STATUS_PROJECT_ARCHIVED } from '../../constants/statuses';
import atoms from '../../atoms';

import {
  colors, margin, borders, flex, layout, effects,
} from '../../theme';

export default function NewIllustration({ projectId }) {
  const [showInput, setShowInput] = useState(false);
  const activeProject = atoms.useRecoilValue(
    atoms.activeProject,
  );

  const activeProjectStatus = atoms.useRecoilValue(
    atoms.status(activeProject),
  );

  const active = activeProjectStatus !== STATUS_PROJECT_ARCHIVED;
  if (!active) {
    return null;
  }

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
      projectId={projectId}
    />
  );
}
