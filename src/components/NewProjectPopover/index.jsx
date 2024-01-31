import { Fragment, useState } from 'react';
import cls from 'classnames';
import { Popover, Transition } from '@headlessui/react';
import { message } from '@tauri-apps/api/dialog';
import Button from '../Button';
import styles from './styles.module.css';
import {
  borders,
  effects,
  flex,
  layout,
  margin,
  padding,
  transitions,
} from '../../theme';
import useCreate from '../../hooks/useCreate';
import LoadingSpinner from '../LoadingSpinner';
import PopoverInputs from './PopoverInputs';

export default function NewProjectPopover() {
  const [newProjectName, setNewProjectName] = useState('');
  const [newIlloName, setNewIlloName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const create = useCreate();

  const panelClass = cls(
    styles.panel,
    padding.p3,
    margin.mt2,
    borders.roundedLg,
    effects.shadowLg,
  );

  const handleCreate = async (close) => {
    setIsCreating(true);
    try {
      await create(newIlloName, { newProject: newProjectName });
    } catch (error) {
      await message(error, { type: 'error' });
    }
    setIsCreating(false);
    close();
  };

  return (
    <Transition
      as={Fragment}
      {...transitions.popover}
    >
      <Popover.Panel className={panelClass}>
        {({ close }) => (
          <>
            {!isCreating ? (
              <PopoverInputs
                setNewIlloName={setNewIlloName}
                setNewProjectName={setNewProjectName}
              />
            ) : (
              <LoadingSpinner />
            )}
            <div className={cls(flex.flex, layout.justifyCenter)}>
              <Button
                variant="ghost"
                onClick={() => close()}
              >
                Cancel
              </Button>
              <Button
                submit
                variant="solid"
                onClick={() => handleCreate(close)}
              >
                Create
              </Button>
            </div>
          </>
        )}
      </Popover.Panel>
    </Transition>
  );
}
