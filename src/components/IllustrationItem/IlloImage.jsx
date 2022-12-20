import cls from 'classnames';
import { DocumentIcon } from '@heroicons/react/24/solid';
import { colors, flex } from '../../theme';
import styles from './styles.module.css';
import IlloHover from './IlloHover';

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

  return (
    <button
      type="button"
      className={imgContainer}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
      onClick={onClick}
    >
      {url ? (
        <img
          className={styles.img}
          src={url}
          alt={`artisan illustration preview for ${slug}`}
        />
      ) : (
        <DocumentIcon
          className={cls(styles.folderIcn, colors.textSlate400, {
            [colors.textSlate600]: !isArchive,
          })}
        />
      )}
      <IlloHover hoverState={hoverState} />
    </button>
  );
}
