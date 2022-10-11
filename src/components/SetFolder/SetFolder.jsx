import { Store } from 'tauri-plugin-store-api';
import { resolve, homeDir } from '@tauri-apps/api/path';
import Button from '../Button';

const store = new Store('.settings');

async function handleClick() {
  const home = await homeDir();
  const projectsPath = await resolve(home, 'Artisan', 'Projects');
  await store.set(
    'projectsFolder',
    projectsPath,
  );
}

async function load() {
  await store.load();
}

async function save() {
  await store.save();
}

async function get() {
  const f = await store.get('projectsFolder');
  console.log(f);
}

export default function SetFolder() {
  return (
    <>
      <Button onClick={handleClick}>Set folder</Button>
      <Button
        onClick={load}
      >
        Load folder
      </Button>
      <Button
        onClick={save}
      >
        Save folder
      </Button>
      <Button
        onClick={get}
      >
        Get folder
      </Button>
    </>
  );
}
