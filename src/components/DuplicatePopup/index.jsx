import { Transition } from '@headlessui/react';
import cls from 'classnames';
import { useState } from 'react';
import {
  transitions,
  colors,
  typography as type,
  flex,
  padding,
  borders,
  effects,
} from '../../theme';
import styles from './styles.module.css';
import Input from '../Input';
import Button from '../Button';
import useDuplicateProject from '../../hooks/useDuplicateProject';

export default function DuplicatePopup({
  projectId,
  showPopup,
  setShowPopup,
}) {
  if (!showPopup) return null;

  const [newName, setNewName] = useState('');
  const duplicate = useDuplicateProject(projectId);

  const boxClass = cls(
    styles.renameBox,
    flex.flex,
    flex.flexCol,
    flex.flexCenter,
    padding.p4,
    colors.bgWhite,
    borders.roundedLg,
    effects.shadowLg,
  );

  const handleClick = async (value) => {
    await duplicate(value);
    setShowPopup(false);
  };

  return (
    <Transition
      show={showPopup}
      className={styles.popupContainer}
      {...transitions.alert}
    >
      <div className={boxClass}>
        <h2 className={cls(colors.textSlate700, type.textLg, type.fontBold)}>
          {'Duplicate: '}
          {`"${projectId}"`}
        </h2>
        <Input
          value={newName}
          setValue={setNewName}
          label="New project name"
        />
        <div className={cls(flex.flex, flex.flexCenter)}>
          <Button
            value="Cancel"
            variant="ghost"
            onClick={() => setShowPopup(false)}
          />
          <Button
            value="Confirm"
            variant="solid"
            onClick={() => handleClick(newName)}
          />
        </div>
      </div>
    </Transition>
  );
}
