import cls from 'classnames';
import { useEffect, useState } from 'react';
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
import store from '../../store';
import Skeleton from '../Skeleton';

export default function ProjectToolbar({ selectedProject, isArchive }) {
  const [isLoading, setIsLoading] = useState(true);
  const [projectDetail, setProjectDetail] = useState({});
  const [status, setStatus] = useState(undefined);
  const [timestamp, setTimestamp] = useState(undefined);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [selectedProject]);

  // Gets project details when selected project changes
  useEffect(() => {
    (async () => {
      if (!isArchive) {
        const project = await store.getProject(selectedProject);
        setProjectDetail(project);
      } else {
        setProjectDetail(selectedProject);
      }
    })();
  }, [selectedProject]);

  // Listener for changes to a project in the store (like backup time)
  useEffect(() => {
    if (!isArchive) {
      const {
        stores: { PROJECTS },
      } = store;
      const unlisten = PROJECTS.onKeyChange(selectedProject, (e) => {
        setProjectDetail(e);
      });
      return () => {
        unlisten.then((f) => f());
      };
    }
    return () => {};
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

  if (isLoading) {
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
        projectSlug={projectDetail?.slug}
        status={status}
      />
    </div>
  );
}
