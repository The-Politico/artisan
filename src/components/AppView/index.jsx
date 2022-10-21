/* eslint-disable react/jsx-one-expression-per-line */
import { useEffect, useState, useCallback } from 'react';
import Button from '../Button';
import cls from './AppView.module.scss';
import { backupFilesS3 } from '../../actions/backup';
import SetFolder from '../SetFolder';
import { getStoreValue } from '../../store';
import { store, projects } from '../../store/init';
import { publishProject } from '../../actions/publish';
import { downloadProject } from '../../actions/download';
import { openInFinder } from '../../actions/open-in-finder';
import { deleteProject } from '../../actions/delete-project';
import { getProjectsArchive } from '../../actions/get-projects-archive';

import CreateIllustration from '../../actions/CreateIllustration';
import Generate from '../../actions/Generate';
import Preview from '../../actions/Preview';

export default function AppView() {
  const [p, setP] = useState([]);
  const [ap, setAp] = useState([]);

  const getP = useCallback(async () => {
    const initP = await getStoreValue('projects') || [];
    setP(initP);
    const unlisten = await store.onKeyChange('projects', async () => {
      const pChange = await getStoreValue('projects') || [];
      console.log('projects list changed');
      setP(pChange);
    });
    return unlisten;
  }, []);

  const handleClick = async () => {
    const projectInfo = await backupFilesS3('project-five');
    console.log(projectInfo);
  };

  const reset = async () => {
    await store.clear();
    await projects.clear();
    await store.save();
    await projects.save();
  };

  const deleteProj = async () => {
    // await removeProject('project-five');
    await deleteProject('project-five');
  };

  const publish = async () => {
    await publishProject('project-five');
  };

  const download = async () => {
    await downloadProject('project-five');
  };

  const openProject = async () => {
    await openInFinder('project-five');
  };

  useEffect(() => {
    getP();

    console.log('effect running');
  }, []);

  useEffect(() => {
    console.log('projects list changed');
    (async () => {
      const archive = await getProjectsArchive();
      setAp(archive);
    })();
  }, [p]);

  return (
    <div className={cls.view}>
      <Button
        onClick={reset}
        variant="solid"
      >
        Reset store
      </Button>
      <Button
        onClick={download}
        variant="outline"
      >
        Download Project
      </Button>
      <Button
        onClick={deleteProj}
        variant="solid"
      >
        Delete Project
      </Button>
      <Button
        onClick={publish}
        variant="outline"
      >
        Publish Project
      </Button>
      <Button
        variant="solid"
        onClick={openProject}
      >
        Open in Finder
      </Button>
      <Button
        variant="solid"
        onClick={handleClick}
      >
        Backup
      </Button>
      <SetFolder />
      <p>Local Projects:</p>
      <ul>{p && p.map((d) => <li key={d}>{d}</li>)}</ul>
      <p>Archive Projects:</p>
      <ul>{ap && ap.map((d) => <li key={d}>{d}</li>)}</ul>
    </div>
  );
}
