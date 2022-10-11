/* eslint-disable react/jsx-one-expression-per-line */
import { ServerIcon } from '@heroicons/react/24/solid';
import cls from 'classnames';
import Button from '../Button';
import styles from './AppView.module.css';
import { layout, spacing } from '../../theme';
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
        List archive
      </Button>
      <Button
        onClick={deleteProj}
        variant="outline"
      >
        Delete Project
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
