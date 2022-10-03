import { ServerIcon } from '@heroicons/react/24/solid';
import Button from '../Button';
import cls from './AppView.module.scss';
import { backupFilesS3 } from '../../actions/backup';

export default function AppView() {
  const handleClick = () => {
    backupFilesS3({
      project: 'project-one',
      files: [
        'test-one.ai',
      ],
    });
  };

  return (
    <div className={cls.view}>
      <Button
        variant="outline"
        className="text-lg"
        onClick={handleClick}
      >
        <ServerIcon className="icon-md mr-1" />
        {' '}
        Backup
      </Button>
    </div>
  );
}
