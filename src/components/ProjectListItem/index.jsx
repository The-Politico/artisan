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
  isArchive,
  setSelectedProject,
}) {
  const [projectDetail, setProjectDetail] = useState();
  const [status, setStatus] = useState(undefined);
  const [projectName, setProjectName] = useState('...');

  useEffect(() => {
    (async () => {
      const project = await store.getProject(projectSlug);
      setProjectDetail(project);
    })();
  }, [isArchive]);

  useEffect(() => {
    if (projectDetail) {
      const { isUploaded, isPublished, name } = projectDetail;
      setProjectName(name);
      if (isArchive) {
        setStatus('archive');
      } else if (isPublished) {
        setStatus('published');
      } else if (isUploaded) {
        setStatus('uploaded');
      }
    }

    return () => {
      setStatus(undefined);
      setProjectName('...');
    };
  }, [projectDetail]);

  const itemClass = cls(
    styles.item,
    colors.textSlate900,
    flex.flex,
    padding.py1,
    padding.px2,
    layout.itemsCenter,
    borders.roundedLg,
    effects.transition,
  );

  return (
    <>
      {(index > 0 || last) && <div className={styles.divider} />}
      <li>
        <button
          type="button"
          className={itemClass}
          onClick={() => setSelectedProject(projectSlug)}
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
