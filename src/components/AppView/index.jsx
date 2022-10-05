/* eslint-disable react/jsx-one-expression-per-line */
import { ServerIcon } from '@heroicons/react/24/solid';
import Button from '../Button';
import cls from './AppView.module.scss';
import { backupFilesS3 } from '../../actions/backup';
import SetFolder from '../SetFolder';
import { getProjects } from '../../actions/get-projects';
import { deleteProject } from '../../actions/delete-project';

export default function AppView() {
  const handleClick = () => {
    backupFilesS3({
      project: 'project-one',
      files: ['test-one.ai'],
    });
  };

  const listArchive = () => {
    getProjects();
  };

  const deleteProj = () => {
    deleteProject('project-one');
  };

  return (
    <div className={cls.view}>
      <SetFolder />
      <Button
        onClick={listArchive}
        variant="outline"
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
