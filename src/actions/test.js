import { type } from '@tauri-apps/api/os';
import { readBinaryFile, readDir } from '@tauri-apps/api/fs';
import { join } from '@tauri-apps/api/path';
import crypto from 'crypto';
import { invoke } from '@tauri-apps/api/tauri';

import { SETTINGS } from '../store/constants';

import store from '../store';
import atoms from '../atoms';
import fetchProjectMeta from '../utils/archive/fetchProjectMeta';
import fetchPreviews from '../utils/archive/fetchPreviews';

import healthCheck from '../utils/illustrations/healthCheck';
import getIllustrationOutputPath from '../utils/paths/getIllustrationOutputPath';

// Just a function to test things, will delete before merge
export default async function testing() {
  // await store.entities.reset();
  // await store.entities.refresh();
  console.log(await readDir(await getIllustrationOutputPath('project-one:map')));
  // await healthCheck();

  // const workingDirectory = await store.settings.get('working-directory');
  // const filePath = await join(
  //   workingDirectory,
  //   'project-two',
  //   'first-illustration',
  //   'first-illustration.ai',
  // );
  // const response = await invoke('hash_file', {
  //   path: filePath,
  // });

  // console.log(response);

  // await store.entities.reset();
  // await store.entities.reset();
  // await store.entities.refresh();

  // await store.entities.refresh();
  // await store.entities.delete('P-this-is-a-new-test');
  // await store.entities.set({
  //   'P-this-is-a-new-test': {
  //     healthy: true,
  //     id: 'P-this-is-a-new-test',
  //     lastUpdated: '2023-03-27T21:31:59.000Z',
  //     name: 'Test Project',
  //     slug: 'test-project',
  //     version: '001679952718059',
  //   },
  // });

  // await store.settings.set({ 'author-name': 'AB' });
  // const settings = await store.settings.get();
  // console.log(settings);
}
