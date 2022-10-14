/* eslint-disable react/jsx-one-expression-per-line */
import { ServerIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import cls from 'classnames';
import Button from '../Button';
import styles from './AppView.module.css';
import { layout, spacing } from '../../theme';
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

  const classNames = cls(
    layout.flex,
    layout.flexCol,
    layout.flexCenter,
    spacing.y,
    styles.hScreen,
  );

  return (
    <div className={classNames}>
      <SetFolder />
      <Button
        onClick={listArchive}
        variant="ghost"
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
        variant="solid"
        onClick={handleClick}
      >
        <ServerIcon className={cls(spacing.mr)} /> Backup
      </Button>
    </div>
  );
}
