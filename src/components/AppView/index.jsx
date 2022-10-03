import Button from '../Button';
import TailwindButton from '../Button/TailwindButton';
import { PlusIcon } from '@heroicons/react/20/solid';
import cls from './AppView.module.scss';

export default function AppView() {
  return (
    <div className={cls.view}>
      <Button
        variant="solid"
        className="text-lg !text-red"
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
