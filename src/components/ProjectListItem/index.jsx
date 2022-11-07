import cls from 'classnames';
import ProjectStatusIcon from '../ProjectStatusIcon';
import styles from './styles.module.css';
import {
  borders,
  effects,
  flex,
  layout,
  padding,
  margin,
  colors,
  typography as type,
} from '../../theme';

export default function ProjectListItem({
  last,
  index,
  projectSlug,
  projectName,
  status,
  setActiveProject,
}) {
  const itemClass = cls(
    styles.item,
    colors.textSlate900,
    flex.flex,
    padding.py1,
    padding.px2,
    layout.itemsCenter,
    borders.roundedLg,
    effects.transition,
  );

  return (
    <>
      {(index > 0 || last) && <div className={styles.divider} />}
      <li>
        <button
          type="button"
          className={itemClass}
          onClick={() => setActiveProject(projectSlug)}
        >
          <ProjectStatusIcon className={styles.icon} status={status} />
          <p className={cls(styles.itemName, type.textLg, margin.ml1)}>
            {projectName}
          </p>
        </button>
      </li>
    </>
  );
}
