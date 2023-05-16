import cls from 'classnames';
import ProjectStatusIcon from '../ProjectStatusIcon';
import ProjectStatusDek from '../ProjectStatusDek';
import {
  flex,
  layout,
  margin,
  colors,
  typography as type,
} from '../../theme';
import ButtonsGroup from './ButtonsGroup';
import atoms from '../../atoms';
import titleify from '../../utils/text/titleify';

export default function ProjectToolbar() {
  const activeProject = atoms.useRecoilValue(
    atoms.activeProject,
  );
  const projectName = titleify(activeProject);

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
