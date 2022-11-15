import cls from 'classnames';
import { PlusIcon } from '@heroicons/react/24/solid';
import Button from '../Button';

import styles from './styles.module.css';

import {
  colors, margin, borders, flex, layout,
} from '../../theme';

export default function NewIllustration() {
  const containerClass = cls(
    styles.buttonSize,
    colors.bgSlate100,
    borders.roundedLg,
    flex.flex,
    flex.flexCenter,
    layout.itemsCenter,
  );
  const buttonClass = cls(
    colors.bgSlate100,
    colors.textSlate300,
    borders.roundedLg,
  );
  const textClass = cls(colors.textSlate400);
  const iconClass = cls(
    colors.textSlate300,
    margin.mb4,
    styles.iconSize,
  );

  const clickHandler = () => {
    // eslint-disable-next-line no-console
    console.log('Placeholder for new illustration Action');
  };

  return (
    <div className={containerClass}>
      <Button
        variant="solid"
        className={buttonClass}
        onClick={clickHandler}
      >
        <PlusIcon className={iconClass} />
        {' '}
        <p className={textClass}>Create</p>
      </Button>
    </div>
  );
}
