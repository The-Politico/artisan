import cls from 'classnames';
import deleteIllustration from '../../actions/deleteIllustration';
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
  const meatballItems = [
    {
      iconName: 'PencilIcon',
      label: 'Rename',
      action: () => console.log('Enable rename for: ', name, slug),
    },
    {
      iconName: 'TrashIcon',
      label: 'Delete',
      action: () => deleteIllustration(projectSlug, slug),
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
        projectSlug={projectSlug}
        url={publicURL}
        slug={slug}
      />
      <div className={nameClass}>
        <p className={cls(type.fontMedium, type.textSm)}>{name}</p>
        <MeatballMenu items={meatballItems} />
      </div>
    </div>
  );
}
