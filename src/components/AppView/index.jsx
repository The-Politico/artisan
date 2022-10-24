import cls from 'classnames';
import { PlusIcon } from '@heroicons/react/20/solid';
import styles from './AppView.module.css';
import { flex, spacing, typography as type, gap } from '../../theme';
import IconButton from '../IconButton';
import ProjectStatusIcon from '../ProjectStatusIcon';
import ProjectStatusDek from '../ProjectStatusDek';
import Button from '../Button';

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
      <div className={cls(flex.flex, flex.flexCenter, gap.x4)}>
        <IconButton
          iconName="GlobeAltIcon"
          label="Publish"
          setWhite
        />
        <IconButton
          iconName="EyeIcon"
          label="Preview"
        />
      </div>
      <div>
        <ProjectStatusIcon />
        <ProjectStatusIcon status="published" />
        <ProjectStatusIcon status="archive" />
        <ProjectStatusIcon size="lg" />
        <ProjectStatusIcon
          status="published"
          size="lg"
        />
        <ProjectStatusIcon
          status="archive"
          size="lg"
        />
      </div>
      <div>
        <ProjectStatusDek />
        <ProjectStatusDek status="archive" />
        <ProjectStatusDek
          status="published"
          timestamp="2022-10-24T18:23:42.536Z"
        />
        <ProjectStatusDek
          status="uploaded"
          timestamp="2022-10-22T18:23:42.536Z"
        />
      </div>
    </div>
  );
}
