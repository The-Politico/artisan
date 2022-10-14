import Button from '../Button';
import { PlusIcon } from '@heroicons/react/20/solid';
import cls from './ActionTestingView.module.scss';

import CreateIllustration from '../../actions/CreateIllustration';
import Generate from '../../actions/Generate';
import Preview from '../../actions/Preview';
import OpenIllustration from '../../actions/OpenIllustration';
import DeleteIllustration from '../../actions/DeleteIllustration';
import OutputShare from '../../actions/OutputShare';
// import Share from '../../actions/Share';
import DuplicateProject from '../../actions/DuplicateProject';

export default function ActionTestingView() {
  return (
    <div className={cls.view}>
      <Button
        variant="solid"
        className="text-lg"
        // onClick={() => downloadTemplate()}
        onClick={() => CreateIllustration('proj-1', 'test-illo')}
      >
        <PlusIcon className="h-6 mr-1" /> Create Illustration
      </Button><br/>
      <Button
        variant="solid"
        className="text-lg"
        // onClick={() => downloadTemplate()}
        onClick={() => OpenIllustration('proj-1', 'test-illo')}
      >Open Illustration
      </Button><br/>
      <Button
        variant="solid"
        className="text-lg"
        // onClick={() => downloadTemplate()}
        onClick={() => Generate('proj-1', 'test-illo')}
      >Generate
      </Button><br/>
      <Button
        variant="solid"
        className="text-lg"
        // onClick={() => downloadTemplate()}
        onClick={() => Preview()}
      >Preview</Button><br/>
      <Button
        variant="solid"
        className="text-lg"
        // onClick={() => downloadTemplate()}
        onClick={() => DeleteIllustration('proj-1', 'test-illo')}
      >Delete Illustration</Button><br/>
      <Button
        variant="solid"
        className="text-lg"
        // onClick={() => downloadTemplate()}
        onClick={() => OutputShare('proj-1')}
      >Output Share</Button><br/>
      <Button
        variant="solid"
        className="text-lg"
        // onClick={() => downloadTemplate()}
        onClick={() => Share('proj-1')}
      >Share</Button><br/>
      <Button
        variant="solid"
        className="text-lg"
        // onClick={() => downloadTemplate()}
        onClick={() => DuplicateProject('proj-1', 'proj-2')}
      >Duplicate Illustration</Button><br/>

    </div>
  );
}

