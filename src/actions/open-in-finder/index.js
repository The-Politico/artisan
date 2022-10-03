/* eslint-disable import/prefer-default-export */
import { open } from '@tauri-apps/api/shell';

async function openInFinder(path) {
  await open(path);
}

export { openInFinder };
