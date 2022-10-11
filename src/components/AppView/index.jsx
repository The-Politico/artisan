import Button from '../Button';
import TailwindButton from '../Button/TailwindButton';
import { PlusIcon } from '@heroicons/react/20/solid';
import cls from './AppView.module.scss';

import CreateIllustration from '../../actions/CreateIllustration';
import Generate from '../../actions/Generate';
import downloadTemplate from '../../actions/CreateIllustration/utils/DownloadTemplate';

export default function AppView() {
  return (
    <div className={cls.view}>
      <Button
        variant="solid"
        className="text-lg !text-red"
        // onClick={() => downloadTemplate()}
        onClick={() => CreateIllustration('proj-5', 'TEST-template')}
      >
        <PlusIcon className="h-6 mr-1" /> New Project
      </Button>
      <TailwindButton
        variant="solid"
        className="text-lg mt-4"
      >
        <PlusIcon className="h-6 mr-1" /> New Project
      </TailwindButton>
    </div>
  );
}

