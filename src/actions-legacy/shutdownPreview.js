import { Command } from '@tauri-apps/api/shell';

import store from '../store';

export default async function shutdownPreview() {
  const { pid } = await store.getPreview();

  const killCommand = new Command(
    'kill-process',
    String(pid),
  );
  await killCommand.spawn();
  await store.updatePreview(null, null);
}
