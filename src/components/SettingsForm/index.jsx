import { useState } from 'react';
import cls from 'classnames';
import styles from './styles.module.css';
import { margin, padding, typography as type } from '../../theme';
import Input from '../Input';
import Advanced from './Advanced';
import Button from '../Button';
import WorkingDir from './WorkingDir';
import atoms from '../../atoms';
import ensureDir from '../../utils/fs/ensureDir';
import AdminReset from '../AdminReset';

export default function SettingsForm({ setIsOpen, isFirstRun = false }) {
  const [settings, setSettings] = atoms.use.settings.useRecoilState();

  const [name, setName] = useState(settings['author-name']);
  const [email, setEmail] = useState(settings['author-email']);
  const [projectsDir, setProjectsDir] = useState(
    settings['working-directory'],
  );
  const [port, setPort] = useState(settings['preferred-port']);

  const handleClick = async () => {
    setSettings({
      'first-run': false,
      'author-name': name,
      'author-email': email,
      'preferred-port': port,
      'working-directory': projectsDir,
    });

    if (isFirstRun) {
      await ensureDir(projectsDir);
      setIsOpen(false);
    }
  };

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
      {!isFirstRun ? (
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
          [type.textXl]: isFirstRun,
          [padding.px8]: isFirstRun,
        })}
        variant="solid"
        onClick={handleClick}
      >
        {isFirstRun ? 'Start' : 'Save'}
      </Button>
      <AdminReset />
    </>
  );
}
