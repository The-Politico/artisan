import cls from 'classnames';
import { useContext, useEffect, useState } from 'react';
import ProjectStatusIcon from '../ProjectStatusIcon';
import ProjectStatusDek from '../ProjectStatusDek';
import {
  flex, layout, margin, colors, typography as type,
} from '../../theme';
import ButtonsGroup from './ButtonsGroup';
import ProjectContext from '../ProjectContext';
import { getProject } from '../../store';

export default function ProjectToolbar() {
  const [projectName, setprojectName] = useState(null);
  const { projectSlug, status } = useContext(ProjectContext);

  useEffect(() => {
    (async () => {
      const project = await getProject(projectSlug);
      console.log(project);
    })();
  }, [projectSlug, status]);

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
          className={cls(colors.textSlate900, type.text2Xl, type.fontSemibold)}
        >
          {projectName}
        </h2>
        <ProjectStatusDek />
      </div>
      <ButtonsGroup status={status} />
    </div>
  );
}
