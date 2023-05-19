/* eslint-disable */
// TODO: Rename ticket
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

export default function RenamePopup({
  oldName,
  projectSlug,
  illoSlug,
  showRename,
  setShowRename,
}) {
  return null;
  // const [newName, setNewName] = useState('');

  // const boxClass = cls(
  //   styles.renameBox,
  //   flex.flex,
  //   flex.flexCol,
  //   flex.flexCenter,
  //   padding.p4,
  //   colors.bgWhite,
  //   borders.roundedLg,
  //   effects.shadowLg,
  // );

  // const renameAction = async (value) => {
  //   if (illoSlug) {
  //     await act.renameIllustration(projectSlug, illoSlug, value);
  //     return;
  //   }
  //   await act.renameProject(projectSlug, value);
  // };

  // return (
  //   <Transition
  //     show={showRename}
  //     className={styles.popupContainer}
  //     {...transitions.alert}
  //   >
  //     <div className={boxClass}>
  //       <h2 className={cls(colors.textSlate700, type.textLg, type.fontBold)}>
  //         {'Rename: '}
  //         {`"${oldName}"`}
  //       </h2>
  //       <Input
  //         value={newName}
  //         setValue={setNewName}
  //       />
  //       <div className={cls(flex.flex, flex.flexCenter)}>
  //         <Button
  //           value="Cancel"
  //           variant="ghost"
  //           onClick={() => setShowRename(false)}
  //         />
  //         <Button
  //           value="Save"
  //           variant="solid"
  //           onClick={() => renameAction(newName)}
  //         />
  //       </div>
  //     </div>
  //   </Transition>
  // );
}
