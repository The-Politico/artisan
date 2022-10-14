import cls from 'classnames';
import Button from '../Button';
import styles from './AppView.module.css';
import { layout, spacing } from '../../theme';

export default function AppView() {
  const classNames = cls(
    layout.flex,
    layout.flexCol,
    layout.flexCenter,
    spacing.y,
    styles.hScreen,
  );

  return (
    <div className={classNames}>
      <Button
        variant="ghost"
      >
        Ghost
      </Button>
      <Button
        variant="outline"
      >
        Outline
      </Button>
      <Button
        variant="solid"
      >
        Solid
      </Button>
    </div>
  );
}
