import cls from 'classnames';
import { useState, useEffect } from 'react';
import ProjectStatusIcon from '../ProjectStatusIcon';
import styles from './styles.module.css';
import store from '../../store';
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
  archiveProject,
  isArchive,
  selectedProject,
  setSelectedProject,
}) {
  const [projectDetail, setProjectDetail] = useState();
  const [status, setStatus] = useState(undefined);
  const [projectName, setProjectName] = useState('...');

  useEffect(() => {
    (async () => {
      if (!isArchive && projectSlug) {
        const project = await store.getProject(projectSlug);
        setProjectDetail(project);
      } else if (isArchive && archiveProject) {
        // when archive, project slug comes over as an object
        setProjectName(archiveProject.name);
      }
    })();
  });

  useEffect(() => {
    if (projectDetail) {
      const { isUploaded, isPublished, name } = projectDetail;
      setProjectName(name);
      if (isPublished) {
        setStatus('published');
      } else if (isUploaded) {
        setStatus('uploaded');
      }
    } else if (isArchive) {
      setStatus('archive');
    }
    return () => {
      setStatus(undefined);
    };
  }, [isArchive, projectDetail]);

  const itemClass = cls(
    styles.item,
    colors.textSlate900,
    flex.flex,
    padding.py1,
    padding.px2,
    layout.itemsCenter,
    borders.roundedLg,
    effects.transition,
    { [styles.selected]: selectedProject === (projectSlug || archiveProject) },
  );

  return (
    <>
      {(index > 0 || last) && <div className={styles.divider} />}
      <li>
        <button
          type="button"
          className={itemClass}
          onClick={() => setSelectedProject(archiveProject || projectSlug)}
        >
          <ProjectStatusIcon
            className={styles.icon}
            status={status}
          />
          <p className={cls(styles.itemName, type.textLg, margin.ml1)}>
            {projectName}
          </p>
        </button>
      </li>
    </>
  );
}
