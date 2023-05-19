import { Fragment, useState } from 'react';
import cls from 'classnames';
import { Popover, Transition } from '@headlessui/react';
import Input from '../Input';
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

export default function NewProjectPopover() {
  const [newProjectName, setNewProjectName] = useState('');
  const [newIlloName, setNewIlloName] = useState('');

  const create = useCreate();

  const panelClass = cls(
    styles.panel,
    padding.p3,
    margin.mt2,
    borders.roundedLg,
    effects.shadowLg,
  );

  const handleCreate = async (close) => {
    await create(newIlloName, { newProject: newProjectName });
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
            <Input
              label="Project Name"
              setValue={setNewProjectName}
            />
            <Input
              label="Illustration Name"
              setValue={setNewIlloName}
            />
            <div className={cls(flex.flex, layout.justifyCenter)}>
              <Popover.Button
                as={Button}
                variant="ghost"
              >
                Cancel
              </Popover.Button>
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
