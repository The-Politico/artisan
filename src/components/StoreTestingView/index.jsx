import useEntities from '../../atoms/entities';

export default function StoreTestingView() {
  const [entities] = useEntities();
  console.log(entities);

  return (
    <div>A</div>
  );
}
