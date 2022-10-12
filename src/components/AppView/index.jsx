/* eslint-disable react/jsx-one-expression-per-line */
import { ServerIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import Button from '../Button';
import cls from './AppView.module.scss';
import { backupFilesS3 } from '../../actions/backup';
import SetFolder from '../SetFolder';
import { removeProject, getStoreValue } from '../../store';
import { store, projects } from '../../store/init';
import { archiveProject } from '../../actions/archive';
import { publishProject } from '../../actions/publish';

export default function AppView() {
  const [p, setP] = useState([]);

  const handleClick = async () => {
    const projectInfo = await backupFilesS3('project-three');
    console.log(projectInfo);
  };

  const reset = async () => {
    await store.reset();
    await projects.reset();
    await store.save();
    await projects.save();
    // console.log({ pr });
  };

  const deleteProj = async () => {
    // await removeProject('project-five');
    await archiveProject('project-five');
  };

  const publish = async () => {
    await publishProject('project-five');
  };

  useEffect(() => {
    const listProjects = async () => {
      const ps = await getStoreValue('projects');
      setP(ps);
    };
    listProjects();
  });

  return (
    <div className={cls.view}>
      {p && p.map((d) => (<span key={d}>{d}</span>))}
      <SetFolder />
      <Button
        onClick={reset}
        variant="solid"
      >
        Reset
      </Button>
      <Button
        onClick={deleteProj}
        variant="outline"
      >
        Arcive Project
      </Button>
      <Button
        onClick={publish}
        variant="solid"
      >
        publish Project
      </Button>
      <Button
        variant="outline"
        className="text-lg"
        onClick={handleClick}
      >
        <ServerIcon className="icon-md mr-1" /> Backup
      </Button>
    </div>
  );
}
