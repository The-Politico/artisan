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
import useOpenIllustration from '../../actions/useOpenIllustration';
import useDeleteIllustration from '../../actions/useDeleteIllustration';
import useGenerateIllustration from '../../actions/useGenerateIllustration';
import { STATUS_ILLUSTRATION_ARCHIVED } from '../../constants/statuses';
import titleify from '../../utils/text/titleify';

import atoms from '../../atoms';

export default function IllustrationItem({ id }) {
  const status = atoms.use.status(id);
  const illoDetails = atoms.use.illustration(id);
  const open = useOpenIllustration(id);
  const deleteIllustration = useDeleteIllustration(id);
  const generate = useGenerateIllustration(id);

  const illoName = titleify(illoDetails.slug);
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
