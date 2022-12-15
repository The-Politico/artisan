import cls from 'classnames';
import { useState, useEffect } from 'react';
import { exists } from '@tauri-apps/api/fs';
import act from '../../actions';
import styles from './styles.module.css';
import MeatballMenu from '../MeatballMenu';
import IlloImage from './IlloImage';
import {
  borders,
  effects,
  flex,
  layout,
  padding,
  typography as type,
} from '../../theme';
import store from '../../store';

export default function IllustrationItem({
  name,
  publicURL,
  slug,
  projectSlug,
  isArchive,
}) {
  const [hoverState, setHoverState] = useState(false);
  const handleClick = async () => {
    await act.openIllustration(projectSlug, slug);
  };

  const meatballItems = [
    {
      iconName: 'PencilIcon',
      label: 'Rename',
      action: () => console.log('Enable rename for: ', name, slug),
    },
    {
      iconName: 'TrashIcon',
      label: 'Delete',
      action: () => act.deleteIllustration(projectSlug, slug),
      danger: true,
    },
  ];

  const containerClass = cls(
    styles.illoContainer,
    flex.flex,
    flex.flexCol,
    borders.roundedMd,
    {
      [styles.isArchive]: isArchive,
      [effects.shadow]: !isArchive,
    },
  );

  const nameClass = cls(
    styles.nameBar,
    flex.flex,
    layout.itemsCenter,
    layout.justifyCenter,
    padding.p2,
    {
      [styles.isArchive]: isArchive,
    },
  );

  return (
    <div className={containerClass}>
      <IlloImage
        hoverState={hoverState}
        setHoverState={setHoverState}
        onClick={handleClick}
        url={publicURL}
        slug={slug}
        isArchive={isArchive}
      />
      <div className={nameClass}>
        <button
          type="button"
          onClick={handleClick}
          className={cls(type.fontMedium, type.textSm)}
          onMouseEnter={() => setHoverState(true)}
          onMouseLeave={() => setHoverState(false)}
        >
          {name}
        </button>
        {!isArchive && <MeatballMenu items={meatballItems} />}
      </div>
    </div>
  );
}
