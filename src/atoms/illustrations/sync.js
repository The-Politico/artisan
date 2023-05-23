import store from '../../store';
import read from './read';

export default function syncIllustrations({
  onSet,
  setSelf,
}) {
  const unsub = store.illustrations.onChange(async () => {
    const illustrations = await read.fetch();
    setSelf(illustrations);
  });

  onSet(() => {
    throw new Error(
      'Atoms Sync Error: "illustrations" atom is being set,'
      + ' but it is is read-only.',
    );
  });

  return () => {
    unsub.then((cb) => cb());
  };
}
