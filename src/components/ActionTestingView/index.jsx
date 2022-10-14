import Button from '../Button';
import { PlusIcon } from '@heroicons/react/20/solid';
import cls from './ActionTestingView.module.scss';

import CreateIllustration from '../../actions/CreateIllustration';
import Generate from '../../actions/Generate';
import Preview from '../../actions/Preview';


export default function ActionTestingView() {
  return (
    <div className={cls.view}>
      <Button
        variant="solid"
        className="text-lg"
        // onClick={() => downloadTemplate()}
        onClick={() => CreateIllustration('proj-1', 'TEST-template')}
      >
        <PlusIcon className="h-6 mr-1" /> Create Illustration
      </Button><br/>
      <Button
        variant="solid"
        className="text-lg"
        // onClick={() => downloadTemplate()}
        onClick={() => OpenIllustration('proj-5', 'TEST-template')}
      >Open Illustration
      </Button><br/>
      <Button
        variant="solid"
        className="text-lg"
        // onClick={() => downloadTemplate()}
        onClick={() => Generate('proj-5', 'TEST-template')}
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
        onClick={() => DeleteIllustration()}
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
        onClick={() => Share()}
      >Output Share</Button><br/>
      <Button
        variant="solid"
        className="text-lg"
        // onClick={() => downloadTemplate()}
        onClick={() =>DuplicateIllustration()}
      >Duplicate Illustration</Button><br/>

    </div>
  );
}

