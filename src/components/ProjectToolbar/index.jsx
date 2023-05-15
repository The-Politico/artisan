import cls from 'classnames';
import ProjectStatusIcon from '../ProjectStatusIcon';
import ProjectStatusDek from '../ProjectStatusDek';
import {
  flex,
  layout,
  margin,
  colors,
  typography as type,
  gap,
  borders,
} from '../../theme';
import ButtonsGroup from './ButtonsGroup';
import Skeleton from '../Skeleton';
import atoms from '../../atoms';
import titleify from '../../utils/text/titleify';

export default function ProjectToolbar() {
  const activeProject = atoms.use.activeProject();
  const projectName = titleify(activeProject);

  // TODO: Skeleton rework?
  if (false) {
    return (
      <div
        className={cls(
          flex.flex,
          flex.flexRow,
          layout.itemsCenter,
          margin.my2,
        )}
      >
        <Skeleton
          variant="circle"
          width="26px"
          height="26px"
        />
        <div
          className={cls(flex.flex, flex.flexCol, gap.y3, margin.ml2)}
          style={{ width: '60%' }}
        >
          <Skeleton
            className={borders.roundedMd}
            width="100%"
            height="28px"
          />
          <Skeleton
            className={borders.roundedMd}
            width="100%"
            height="12px"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cls(flex.flex, flex.flexRow, layout.itemsCenter, margin.my2)}
    >
      <ProjectStatusIcon
        id={activeProject}
        size="lg"
        className={margin.mr2}
      />
      <div>
        <h2
          className={cls(colors.textSlate900, type.text2Xl, type.fontSemibold)}
        >
          {projectName}
        </h2>
        <ProjectStatusDek
          id={activeProject}
        />
      </div>
      <ButtonsGroup id={activeProject} />
    </div>
  );
}
