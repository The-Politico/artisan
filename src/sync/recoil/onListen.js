import store from '../../store';

/**
 * Listens to changes in the store entities and updates the recoil atoms with
 * the new values.
 *
 * @param {Object} options - The options for the listen function.
 * @param {Function} options.updateItem - The function that updates
 * the item with the new values.
 *
 * @returns {Function} - A function to unsubscribe from the store listeners.
 */
export default function onListen({ updateItem }) {
  console.log('Listening!');

  let unSubscribeFromStoreOnChange;
  store.entities.onChange((key, value) => {
    if (key[0] === 'I') {
      updateItem(`illustrations__${key}`, value);
    }

    if (key[0] === 'P') {
      updateItem(`projects__${key}`, value);
    }
  }).then((cb) => {
    unSubscribeFromStoreOnChange = cb;
  });

  let unSubscribeFromStoreOnKeyChange;
  store.entities.onKeyChange(async () => {
    const resetEntities = await store.sync.read.entities();
    updateItem('entities', resetEntities);
  }).then((cb) => {
    unSubscribeFromStoreOnKeyChange = cb;
  });

  return () => {
    console.log('Unlistening!');

    if (typeof unSubscribeFromStore === 'function') {
      unSubscribeFromStoreOnChange();
      unSubscribeFromStoreOnKeyChange();
    }
  };
}
