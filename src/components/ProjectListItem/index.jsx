import cls from 'classnames';
import ProjectStatusIcon from '../ProjectStatusIcon';
import styles from './styles.module.css';
import atoms from '../../atoms';
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
import Skeleton from '../Skeleton';

export default function ProjectListItem({
  id,
}) {
  const [
    activeProject,
    setActiveProject,
  ] = atoms.useRecoilState(
    atoms.activeProject,
  );
  const isActive = activeProject === id;

  const itemClass = cls(
    styles.item,
    colors.textSlate900,
    flex.flex,
    padding.py1,
    padding.px2,
    layout.itemsCenter,
    borders.roundedLg,
    effects.transition,
    { [styles.selected]: isActive },
  );

  return (
    <>
      <li>
        {!id ? (
          <div
            className={cls(
              flex.flex,
              layout.itemsCenter,
              padding.py1,
              padding.px2,
            )}
          >
            <Skeleton
              height="24px"
              width="24px"
              variant="circle"
            />
            <Skeleton
              height="20px"
              width="75%"
              className={cls(margin.ml2, margin.my1, borders.roundedLg)}
            />
          </div>
        ) : (
          <button
            type="button"
            className={itemClass}
            onClick={() => setActiveProject(id)}
          >
            <ProjectStatusIcon
              className={styles.icon}
              id={id}
            />
            <p className={cls(styles.itemName, type.textLg, margin.ml1)}>
              {id}
            </p>
          </button>
        )}
      </li>
      <div className={styles.divider} />
    </>
  );
}
