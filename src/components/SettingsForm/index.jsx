import { useState } from 'react';
import cls from 'classnames';
import { invoke } from '@tauri-apps/api';
import { WebviewWindow } from '@tauri-apps/api/window';

import Advanced from './Advanced';
import Button from '../Button';
import WorkingDir from './WorkingDir';

import atoms from '../../atoms';
import ensureDir from '../../utils/fs/ensureDir';
import store from '../../store';

import {
  flex, margin, padding, typography as type,
} from '../../theme';
import store from '../../store';

export default function SettingsForm({ isWelcome = false }) {
  const [settings, setSettings] = atoms.useRecoilState(atoms.settings);

  const [projectsDir, setProjectsDir] = useState(
    settings['working-directory'],
  );
  const [port, setPort] = useState(settings['preferred-port']);

  const handleSave = async () => {
    setSettings({
      'preferred-port': port,
      'working-directory': projectsDir,
    });

    await ensureDir(projectsDir);

    if (isWelcome) {
      const url = await invoke('get_auth_url');
      // eslint-disable-next-line no-unused-vars
      const view = new WebviewWindow('oauth', {
        url,
        center: true,
        focus: true,
        alwaysOnTop: true,
      });
    }
  };

  const handleSignOut = async () => {
    await store.auth.reset();
  };

  return (
    <>
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
      <div className={cls(flex.flex, flex.flexCenter, margin.mt6)}>
        <Button
          className={cls(margin.mr1, {
            [type.textXl]: isWelcome,
            [padding.px8]: isWelcome,
          })}
          variant="solid"
          onClick={handleSave}
        >
          {isWelcome ? 'Sign in to Box' : 'Save'}
        </Button>
        {!isWelcome && (
          <Button
            variant="ghost"
            value="Sign out of Box"
            onClick={handleSignOut}
          />
        )}
      </div>
    </>
  );
}
