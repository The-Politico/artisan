import cls from 'classnames';
import { useState } from 'react';
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
import useOpenIllustration from '../../hooks/useOpenIllustration';
import useDeleteIllustration from '../../hooks/useDeleteIllustration';
import useGenerateIllustration from '../../hooks/useGenerateIllustration';
import { STATUS_ILLUSTRATION_ARCHIVED } from '../../constants/statuses';

import atoms from '../../atoms';
import ids from '../../utils/ids';

export default function IllustrationItem({ id }) {
  const status = atoms.useRecoilValue(
    atoms.status(id),
  );

  const { illustration: illoName } = ids.parse(id);

  const open = useOpenIllustration(id);
  const deleteIllustration = useDeleteIllustration(id);
  const generate = useGenerateIllustration(id);

  const isArchive = status === STATUS_ILLUSTRATION_ARCHIVED;

  const [hoverState, setHoverState] = useState(false);

  const meatballItems = [
    {
      iconName: 'WrenchIcon',
      label: 'Generate',
      action: generate,
      danger: false,
    },
    {
      iconName: 'TrashIcon',
      label: 'Delete',
      action: deleteIllustration,
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
        id={id}
        illoName={illoName}
        hoverState={hoverState}
        setHoverState={setHoverState}
        onClick={open}
        isArchive={isArchive}
      />
      <div className={nameClass}>
        <button
          type="button"
          onClick={open}
          className={cls(type.fontMedium, type.textSm)}
          onMouseEnter={() => setHoverState(true)}
          onMouseLeave={() => setHoverState(false)}
        >
          {illoName}
        </button>
        <MeatballMenu active={!isArchive} items={meatballItems} />
      </div>
    </div>
  );
}
