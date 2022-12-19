import { Fragment, useState } from 'react';
import cls from 'classnames';
import { Popover, Transition } from '@headlessui/react';
import { message } from '@tauri-apps/api/dialog';
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
import act from '../../actions';

export default function NewProjectPopover() {
  const [newProjectName, setNewProjectName] = useState('');
  const [newIlloName, setNewIlloName] = useState('');

  const panelClass = cls(
    styles.panel,
    padding.p3,
    margin.mt2,
    borders.roundedLg,
    effects.shadowLg,
  );

  const handleCreate = async (close) => {
    if (newProjectName === '' || newIlloName === '') {
      await message('Project Name and Illustration Name cannot be blank', {
        title: 'Oops!',
        type: 'error',
      });
      return;
    }
    const { slug } = await act.createProject(newProjectName);
    await act.createIllustration(slug, newIlloName);
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
