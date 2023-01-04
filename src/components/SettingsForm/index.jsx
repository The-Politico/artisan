import { useState, useEffect } from 'react';
import cls from 'classnames';
import styles from './styles.module.css';
import { margin, padding, typography as type } from '../../theme';
import store from '../../store';
import Input from '../Input';
import Advanced from './Advanced';
import Button from '../Button';
import WorkingDir from './WorkingDir';

export default function SettingsForm({ setIsOpen, isWelcome = false }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectsDir, setProjectsDir] = useState('');
  const [port, setPort] = useState('');

  const handleClick = async () => {
    await store.updateSettings({
      firstRun: false,
      authorName: name,
      authorEmail: email,
      preferredPort: port,
      workingDir: projectsDir,
    });

    if (isWelcome) {
      setIsOpen(false);
    }
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
    <>
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
      {!isWelcome ? (
        <Advanced
          projectsDir={projectsDir}
          port={port}
          setPort={setPort}
        />
      ) : (
        <WorkingDir
          projectsDir={projectsDir}
          setProjectsDir={setProjectsDir}
        />
      )}
      <Button
        className={cls(margin.mt4, {
          [type.textXl]: isWelcome,
          [padding.px8]: isWelcome,
        })}
        variant="solid"
        onClick={handleClick}
      >
        {isWelcome ? 'Start' : 'Save'}
      </Button>
    </>
  );
}
