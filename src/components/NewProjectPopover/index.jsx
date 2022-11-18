import { Fragment, useState } from 'react';
import cls from 'classnames';
import { Popover, Transition } from '@headlessui/react';
import Input from '../Input';
import Button from '../Button';
import styles from './styles.module.css';
import { borders, effects, flex, layout, margin, padding } from '../../theme';
import { createIllustration, createProject } from '../../actions';

export default function NewProjectPopover() {
  const [newProjectName, setNewProjectName] = useState('');
  const [newIlloName, setNewIlloName] = useState('');

  const panelClass = cls(
    styles.panel,
    padding.p3,
    margin.mt2,
    borders.roundedLg,
    effects.sahdowLg,
  );

  const { enter, enterTo, enterFrom, leave, leaveFrom, leaveTo } = styles;
  const timings = {
    enter,
    enterTo,
    enterFrom,
    leave,
    leaveFrom,
    leaveTo,
  };

  const handleCreate = async (close) => {
    const { slug } = await createProject(newProjectName);
    await createIllustration(slug, newIlloName);
    close();
  };

  return (
    <Transition as={Fragment} {...timings}>
      <Popover.Panel className={panelClass}>
        {({ close }) => (
          <>
            <Input
              inputLabel="Project Name"
              setTextInput={setNewProjectName}
            />
            <Input
              inputLabel="Illustration Name"
              setTextInput={setNewIlloName}
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
