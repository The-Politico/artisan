import cls from 'classnames';
import { useEffect, useState, useCallback } from 'react';
import ProjectStatusIcon from '../ProjectStatusIcon';
import ProjectStatusDek from '../ProjectStatusDek';
import { flex, layout, margin, colors, typography as type } from '../../theme';
import ButtonsGroup from './ButtonsGroup';
import { getProject } from '../../store';
import { projects } from '../../store/init';

export default function ProjectToolbar({ selectedProject }) {
  const [projectDetail, setProjectDetail] = useState({});
  const [status, setStatus] = useState(undefined);
  const [timestamp, setTimestamp] = useState(undefined);
  const [unlisten, setUnlisten] = useState(() => () => {});

  const handleChange = useCallback(async () => {
    const un = await projects.onKeyChange(selectedProject, (e) => {
      console.log('Listening for changes to: ', selectedProject);
      setProjectDetail(e);
    });
    setUnlisten(un);
  }, [selectedProject]);

  useEffect(() => {
    (async () => {
      const project = await getProject(selectedProject);
      setProjectDetail(project);
    })();
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      console.log('Selected Project changed');
      handleChange();
    }
    return () => {
      unlisten();
    };
  }, []);

  useEffect(() => {
    if (projectDetail) {
      const { isUploaded, isPublished, lastUploaded } = projectDetail;
      if (isPublished) {
        setStatus('published');
        setTimestamp(lastUploaded);
      } else if (isUploaded) {
        setStatus('uploaded');
        setTimestamp(lastUploaded);
      }
    }
  }, [projectDetail]);

  return (
    <div
      className={cls(flex.flex, flex.flexRow, layout.itemsCenter, margin.mb4)}
    >
      <ProjectStatusIcon
        size="lg"
        className={margin.mr2}
        status={status}
      />
      <div>
        <h2
          className={cls(colors.textSlate900, type.text2Xl, type.fontSemibold)}
        >
          {projectDetail?.name}
        </h2>
        <ProjectStatusDek
          projectSlug={selectedProject}
          status={status}
          timestamp={timestamp}
        />
      </div>
      <ButtonsGroup
        projectSlug={selectedProject}
        status={status}
      />
    </div>
  );
}
