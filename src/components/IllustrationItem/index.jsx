import cls from 'classnames';
import { useState } from 'react';
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

export default function IllustrationItem({
  name,
  publicURL,
  slug,
  projectSlug,
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
    styles.container,
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
        url={publicURL || `https://picsum.photos/seed/${slug}/200/200`}
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
