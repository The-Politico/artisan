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

export default function SettingsForm({ isWelcome = false }) {
  const [settings, setSettings] = atoms.useRecoilState(
    atoms.settings,
  );

  const [awsId, setAwsId] = useState(settings['aws-id']);
  const [awsSecret, setAwsSecret] = useState(settings['aws-secret']);

  const [projectsDir, setProjectsDir] = useState(
    settings['working-directory'],
  );
  const [port, setPort] = useState(settings['preferred-port']);

  const handleClick = async () => {
    setSettings({
      'aws-id': awsId,
      'aws-secret': awsSecret,
      'preferred-port': port,
      'working-directory': projectsDir,
    });

    await ensureDir(projectsDir);
  };

  return (
    <>
      <Input
        label="AWS Access Key Id"
        setValue={setAwsId}
        value={awsId}
        type="password"
        className={styles.settingsInput}
      />
      <Input
        label="AWS Secret Access Key"
        setValue={setAwsSecret}
        value={awsSecret}
        type="password"
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
      <AdminReset />
    </>
  );
}
