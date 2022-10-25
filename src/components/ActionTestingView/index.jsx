import { PlusIcon } from '@heroicons/react/20/solid';
import Button from '../Button';
import cls from './ActionTestingView.module.scss';

import CreateIllustration from '../../actions/CreateIllustration';
import Generate from '../../actions/Generate';
import Preview from '../../actions/Preview';
import OpenIllustration from '../../actions/OpenIllustration';
import DeleteIllustration from '../../actions/DeleteIllustration';
import OutputShare from '../../actions/OutputShare';
import DuplicateProject from '../../actions/DuplicateProject';
import CreateProject from '../../actions/CreateProject';

import getSharePage from '../../utils/get-share-page';

export default function ActionTestingView() {
  return (
    <div className={cls.view}>
      <Button
        variant="solid"
        className="text-lg"
        // onClick={() => downloadTemplate()}
        onClick={() => CreateProject('proj-1')}
      >
        <PlusIcon className="h-6 mr-1" />
        Create Project

      </Button>
      <br />
      <Button
        variant="solid"
        className="text-lg"
        // onClick={() => downloadTemplate()}
        onClick={() => CreateIllustration('proj-1', 'test-illo')}
      >
        <PlusIcon className="h-6 mr-1" />
        Create Illustration
      </Button>
      <br />
      <Button
        variant="solid"
        className="text-lg"
        // onClick={() => downloadTemplate()}
        onClick={() => OpenIllustration('proj-1', 'test-illo')}
      >
        Open Illustration
      </Button>
      <br />
      <Button
        variant="solid"
        className="text-lg"
        // onClick={() => downloadTemplate()}
        onClick={() => Generate('proj-1', 'test-illo')}
      >
        Generate
      </Button>
      <br />
      <Button
        variant="solid"
        className="text-lg"
        onClick={() => Preview('proj-1')}
      >
        Preview

      </Button>
      <br />
      <Button
        variant="solid"
        className="text-lg"
        onClick={() => OutputShare('proj-1')}
      >
        Output Share

      </Button>
      <br />
      <Button
        variant="solid"
        className="text-lg"
      >
        <a
          target="_blank"
          href={getSharePage('proj-1')}
          rel="noreferrer"
        >
          Test Share
        </a>

      </Button>
      <br />
      <Button
        variant="solid"
        className="text-lg"
        onClick={() => DuplicateProject('proj-1', 'proj-2')}
      >
        Duplicate Project

      </Button>
      <br />
      <Button
        variant="solid"
        className="text-lg"
        onClick={() => DeleteIllustration('proj-1', 'test-illo')}
      >
        Delete Illustration

      </Button>
      <br />
    </div>
  );
}
