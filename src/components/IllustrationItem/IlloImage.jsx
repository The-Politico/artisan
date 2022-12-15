import cls from 'classnames';
import {
  ArrowTopRightOnSquareIcon,
  DocumentIcon,
} from '@heroicons/react/24/solid';
import { colors, flex } from '../../theme';
import styles from './styles.module.css';

export default function IlloImage({
  url,
  slug,
  onClick,
  hoverState,
  setHoverState,
  isArchive,
}) {
  const imgContainer = cls(styles.imgContainer, flex.flex, flex.flexCenter, {
    [colors.bgSlate700]: !isArchive,
  });

  if (!url) {
    return (
      <button
        type="button"
        className={imgContainer}
        onMouseEnter={() => setHoverState(true)}
        onMouseLeave={() => setHoverState(false)}
        onClick={onClick}
      >
        {hoverState && (
          <div className={styles.hoverState}>
            <ArrowTopRightOnSquareIcon
              className={cls(styles.arrowIcn, colors.textSlate200)}
            />
          </div>
        )}
        <DocumentIcon
          className={cls(styles.folderIcn, colors.textSlate400, {
            [colors.textSlate600]: !isArchive,
          })}
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      className={imgContainer}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
      onClick={onClick}
    >
      <img
        className={styles.img}
        src={url}
        alt={`artisan illustration preview for ${slug}`}
      />
      {hoverState && (
        <div className={styles.hoverState}>
          <ArrowTopRightOnSquareIcon
            className={cls(styles.arrowIcn, colors.textSlate200)}
          />
        </div>
      )}
    </button>
  );
}
