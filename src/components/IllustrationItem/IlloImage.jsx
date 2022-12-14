import cls from 'classnames';
import {
  ArrowTopRightOnSquareIcon,
  DocumentIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { colors, flex } from '../../theme';
import styles from './styles.module.css';
import openIllustration from '../../actions/openIllustration';

export default function IlloImage({ url, slug, projectSlug }) {
  const [hoverState, setHoverState] = useState(false);

  const handleClick = async () => {
    await openIllustration(projectSlug, slug);
  };

  if (!url) {
    return (
      <button
        type="button"
        className={cls(styles.illoImg, flex.flex, flex.flexCenter)}
        onMouseEnter={() => setHoverState(true)}
        onMouseLeave={() => setHoverState(false)}
        onClick={handleClick}
      >
        {hoverState && (
          <div className={styles.hoverState}>
            <ArrowTopRightOnSquareIcon
              className={cls(styles.arrowIcn, colors.textSlate200)}
            />
          </div>
        )}
        <DocumentIcon className={cls(styles.folderIcn, colors.textSlate600)} />
      </button>
    );
  }

  return <div>IlloImage</div>;
}
