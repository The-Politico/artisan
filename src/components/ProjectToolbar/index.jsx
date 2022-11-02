import cls from 'classnames';
import { useEffect, useState } from 'react';
import ProjectStatusIcon from '../ProjectStatusIcon';
import ProjectStatusDek from '../ProjectStatusDek';
import { flex, layout, margin, colors, typography as type } from '../../theme';
import ButtonsGroup from './ButtonsGroup';
import store from '../../store';

export default function ProjectToolbar({ selectedProject, isArchive }) {
  const [projectDetail, setProjectDetail] = useState({});
  const [status, setStatus] = useState(undefined);
  const [timestamp, setTimestamp] = useState(undefined);

  // Gets project details when selected project changes
  useEffect(() => {
    (async () => {
      const project = await store.getProject(selectedProject);
      setProjectDetail(project);
    })();
  }, [selectedProject]);

  // Listener for changes to a project in the store (like backup time)
  useEffect(() => {
    const { stores: { PROJECTS } } = store;
    const unlisten = PROJECTS.onKeyChange(selectedProject, (e) => {
      setProjectDetail(e);
    });
    return () => {
      unlisten.then((f) => f());
    };
  }, [selectedProject]);

  // Sets status and timestamp from project details
  useEffect(() => {
    if (projectDetail) {
      const { isUploaded, isPublished, lastUploaded } = projectDetail;
      if (isArchive) {
        setStatus('archive');
      } else if (isPublished) {
        setStatus('published');
        setTimestamp(lastUploaded);
      } else if (isUploaded) {
        setStatus('uploaded');
        setTimestamp(lastUploaded);
      }
    }

    // Cleanup incase changing projects causes some odd dispaly status
    return () => {
      setStatus(undefined);
      setTimestamp(undefined);
    };
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
