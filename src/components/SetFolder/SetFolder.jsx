import { resolve, homeDir } from '@tauri-apps/api/path';
import { addProject, getStoreValue, updateAppSettings } from '../../store';
import Button from '../Button';

async function handleClick() {
  const home = await homeDir();
  const projectsPath = await resolve(home, 'Artisan', 'Projects');
  await updateAppSettings(
    {
      projectsFolder: projectsPath,
    },
  );
}

async function setProject() {
  const f = await addProject('Project Five');
  console.log(f);
}

async function get() {
  const f = await getStoreValue('projects');
  console.log(f);
}

export default function SetFolder() {
  return (
    <>
      <Button onClick={handleClick}>Set folder</Button>
      <Button onClick={setProject}>New project</Button>
      <Button
        onClick={get}
      >
        Get folder
      </Button>
    </>
  );
}
