import cls from 'classnames';
import { useState, useEffect } from 'react';
import { join, desktopDir } from '@tauri-apps/api/path';
import { convertFileSrc } from '@tauri-apps/api/tauri';
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
}) {
  const [hoverState, setHoverState] = useState(false);
  const [foo, setFoo] = useState(null);

  const handleClick = async () => {
    await act.openIllustration(projectSlug, slug);
  };

  useEffect(() => {
    (async () => {
      const dir = await store.getWorkingDir();
      const path = await join(dir, projectSlug, slug, 'fallback_mobile.png');
      const hasFallback = await exists(path);
      if (hasFallback) {
        setFoo(`asset://localhost/${path}`);
      }
    })();
  }, []);

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
    effects.shadow,
  );

  const nameClass = cls(
    styles.nameBar,
    flex.flex,
    layout.itemsCenter,
    layout.justifyCenter,
    padding.p2,
  );

  return (
    <div className={containerClass}>
      <IlloImage
        hoverState={hoverState}
        setHoverState={setHoverState}
        onClick={handleClick}
        url={foo || publicURL}
        slug={slug}
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
        <MeatballMenu items={meatballItems} />
      </div>
    </div>
  );
}
