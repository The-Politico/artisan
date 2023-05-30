import cls from 'classnames';
import { DocumentIcon } from '@heroicons/react/24/solid';
import { colors, flex } from '../../theme';
import styles from './styles.module.css';
import IlloHover from './IlloHover';
import useIllustrationFallback from '../../hooks/useIllustrationFallback';

export default function IlloImage({
  id,
  illoName,
  onClick,
  hoverState,
  setHoverState,
}) {
  const imgContainer = cls(
    styles.imgContainer,
    flex.flex,
    flex.flexCenter,
    colors.bgSlate700,
  );

  const fallback = useIllustrationFallback(id);

  return (
    <button
      type="button"
      className={imgContainer}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
      onClick={onClick}
    >
      {fallback ? (
        <img
          className={styles.img}
          src={fallback}
          alt={`artisan illustration preview for ${illoName}`}
        />
      ) : (
        <DocumentIcon className={cls(styles.folderIcn, colors.textSlate600)} />
      )}
      <IlloHover hoverState={hoverState} />
    </button>
  );
}
