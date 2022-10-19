import { resolve, homeDir } from '@tauri-apps/api/path';
import {
  getProject,
  getStoreValue,
  updateAppSettings,
} from '../../store';
import Button from '../Button';

async function handleClick() {
  const home = await homeDir();
  const projectsPath = await resolve(home, 'Artisan', 'Projects');
  await updateAppSettings({
    projectsFolder: projectsPath,
  });
}

async function get() {
  const f = await getStoreValue('projectsFolder');
  console.log(f);
}

async function getProjectsList() {
  const f = await getStoreValue('projects');
  console.log(f);
}

async function getProjectDetails() {
  const f = await getProject('project-five');
  console.log(f);
}

export default function SetFolder() {
  return (
    <>
      <Button onClick={handleClick}>1. Set up settings</Button>
      {/* <Button onClick={setProject}>2. Add project to store</Button> */}
      <Button onClick={get}>2. Log projects folder</Button>
      <Button onClick={getProjectsList}>3. Log projects list</Button>
      <Button onClick={getProjectDetails}>4. Log projects details</Button>
    </>
  );
}
