import cls from 'classnames';
import ProjectStatusIcon from '../ProjectStatusIcon';
import ProjectStatusDek from '../ProjectStatusDek';
import { flex, layout, margin, colors, typography as type } from '../../theme';

export default function ProjectToolbar({ selectedProject }) {
  return (
    <div
      className={cls(flex.flex, flex.flexRow, layout.itemsCenter, margin.mb4)}
    >
      <ProjectStatusIcon
        size="lg"
        className={margin.mr2}
      />
      <div>
        <h2
          className={cls(
            colors.textSlate900,
            type.text2Xl,
            type.fontSemibold,
          )}
        >
          {selectedProject}
        </h2>
        <ProjectStatusDek />
      </div>
    </div>
  );
}
