import cls from 'classnames';
import { useState, useEffect, Fragment } from 'react';
import { Popover, Portal, Transition } from '@headlessui/react';
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
import Advanced from './Advanced';

export default function SettingsPopover() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectsDir, setProjectsDir] = useState('');
  const [port, setPort] = useState('');

  const panelClass = cls(
    styles.panel,
    padding.p4,
    padding.pb4,
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
      preferredPort: port,
    });
  };

  useEffect(() => {
    (async () => {
      const settings = await store.getSettings();
      const {
        authorName, authorEmail, workingDir, preferredPort,
      } = settings;

      setName(authorName);
      setEmail(authorEmail);
      setProjectsDir(workingDir);
      setPort(preferredPort);
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
        <Input
          label="Email"
          setValue={setEmail}
          value={email}
          className={styles.settingsInput}
        />
        <div className={styles.divider} />
        <Advanced
          projectsDir={projectsDir}
          port={port}
          setPort={setPort}
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
