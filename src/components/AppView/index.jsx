/* eslint-disable react/jsx-one-expression-per-line */
import { ServerIcon } from '@heroicons/react/24/solid';
import cls from 'classnames';
import Button from '../Button';
import styles from './AppView.module.css';
import * as nes from '../../nes';
import { backupFilesS3 } from '../../actions/backup';
import SetFolder from '../SetFolder';
import { getProjects } from '../../actions/get-projects-archive';
import { deleteProject } from '../../actions/delete-project';

export default function AppView() {
  const handleClick = () => {
    backupFilesS3({
      project: 'project-three',
      files: ['test-one.ai'],
    });
  };

  const listArchive = async () => {
    const p = await getProjects();
    console.log({ p });
  };

  const deleteProj = () => {
    deleteProject('project-one');
  };

  const classNames = cls(
    nes.layout.flex,
    nes.layout.flexCol,
    nes.layout.flexCenter,
    nes.spacing.y,
    styles.hScreen,
  );

  return (
    <div className={classNames}>
      <SetFolder />
      <Button
        onClick={listArchive}
        variant="solid"
      >
        List archive
      </Button>
      <Button
        onClick={deleteProj}
        variant="outline"
      >
        Delete Project
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
