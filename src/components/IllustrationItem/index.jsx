import deleteIllustration from '../../actions/deleteIllustration';
import MeatballMenu from '../MeatballMenu';
import IlloImage from './IlloImage';

export default function IllustrationItem({ name, publicURL, slug }) {
  const meatballItems = [
    {
      iconName: 'ServerIcon',
      label: 'Rename',
      action: () => console.log('Enable rename for: ', name, slug),
    },
    {
      iconName: 'TrashIcon',
      label: 'Delete',
      action: () => deleteIllustration(slug),
      danger: true,
    },
  ];

  return (
    <div>
      <IlloImage url={publicURL} />
      <div>
        <p>{name}</p>
        <MeatballMenu items={meatballItems} />
      </div>
    </div>
  );
}
