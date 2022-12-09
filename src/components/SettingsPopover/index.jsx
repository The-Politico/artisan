import cls from 'classnames';
import { useState, useEffect, Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import store from '../../store';
import Input from '../Input';
import Button from '../Button';
import {
  flex,
  layout,
  margin,
  padding,
  colors,
  typography as type,
  borders,
  effects,
  transitions,
} from '../../theme';
import styles from './styles.module.css';
import ProjectsFolder from './ProjectsFolder';

export default function SettingsPopover() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectsDir, setProjectsDir] = useState('');

  const panelClass = cls(
    styles.panel,
    padding.p4,
    flex.flex,
    flex.flexCol,
    layout.itemsCenter,
    borders.roundedLg,
    effects.shadowLg,
  );

  const handleClick = async () => {
    await store.updateSettings({
      authorName: name,
      authorEmail: email,
    });
  };

  useEffect(() => {
    (async () => {
      const { authorName, authorEmail, workingDir } =
        await store.getSettings();

      setName(authorName);
      setEmail(authorEmail);
      setProjectsDir(workingDir);
    })();
  }, []);

  return (
    <Transition
      as={Fragment}
      {...transitions.popover}
    >
      <Popover.Panel className={panelClass}>
        <h3 className={cls(colors.textSlate700, type.fontSemibold)}>
          Settings
        </h3>
        <Input
          label="Full Name"
          setValue={setName}
          value={name}
          className={styles.settingsInput}
        />
        <div className={styles.divider} />
        <Input
          label="Email"
          setValue={setEmail}
          value={email}
          className={styles.settingsInput}
        />
        <div className={styles.divider} />
        <ProjectsFolder
          projectsDir={projectsDir}
          isInitial={false}
        />
        <Button
          className={cls(margin.mt4)}
          variant="solid"
          onClick={handleClick}
        >
          Save
        </Button>
      </Popover.Panel>
    </Transition>
  );
}
