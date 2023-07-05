import cls from 'classnames';
import {
  colors, flex, layout, margin, typography as type,
} from '../../theme';
import ProjectListItem from '../ProjectListItem';
import atoms from '../../atoms';
import boxprojectsAtom from '../../atoms/DEV_boxProjects/atom';

export default function ProjectList() {
  const projectsList = atoms.useRecoilValue(
    atoms.projectsList,
  );

  // DEV
  const boxProjects = atoms.useRecoilValue(boxprojectsAtom);

  return (
    <div>
      <div
        className={cls(
          flex.flex,
          layout.itemsCenter,
          layout.justifyBetween,
          margin.ml1,
          margin.mb2,
        )}
      >
        <h4
          className={cls(type.textLg, type.fontSemibold, colors.textSlate800)}
        >
          My Projects
        </h4>
      </div>
      <ul>
        {/* DEV START */}
        {projectsList.length > 0 && projectsList.map((id) => (
          <ProjectListItem
            key={id}
            id={id}
          />
        ))}
        {/* DEV END */}
        {boxProjects.length > 0 && boxProjects.map((id) => (
          <div key={id}>{id}</div>
        ))}
      </ul>
    </div>
  );
}
