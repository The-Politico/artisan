import cls from 'classnames';
import { PlusIcon } from '@heroicons/react/20/solid';
import Button from '../Button';
import styles from './AppView.module.css';
import { flex, spacing, typography as type } from '../../theme';

export default function AppView() {
  const classNames = cls(
    flex.flex,
    flex.flexCol,
    flex.flexCenter,
    spacing.y4,
    styles.hScreen,
  );

  return (
    <div className={classNames}>
      <Button variant="ghost">Ghost button</Button>
      <Button variant="outline">Outline button</Button>
      <Button
        variant="solid"
        value="New Project"
        className={type.textXl}
        icon={<PlusIcon className={styles.icon} />}
      />
    </div>
  );
}
