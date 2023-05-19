import store from '../../store';
import createListenerSet from '../../utils/listenerSet';

const listeners = createListenerSet();

/**
 * Listens to changes in the store entities and updates the recoil atoms with
 * the new values.
 *
 * @param {Object} options - The options for the listen function.
 * @param {Function} options.updateItem - The function that updates
 * the item with the new values.
 *
 */
export default function onListen({ updateItem }) {
  listeners.add(
    'settings__onChange', () => store.settings.onChange(async () => {
      const settings = await store.settings.get();
      const settingsAsObject = Object.fromEntries(settings);
      updateItem('settings', settingsAsObject);
    }),
  );

  listeners.add(
    'preview__onChange', () => store.preview.onChange(async () => {
      const preview = await store.preview.get();
      const previewAsObject = Object.fromEntries(preview);
      updateItem('preview', previewAsObject);
    }),
  );

  listeners.add(
    'entities__onChange', () => store.illustrations.onChange(
      async (key, value) => {
        // Update the master entities list
        const entities = await store.illustrations.get();
        const entitiesAsList = entities.map(([entitiyKey]) => entitiyKey);
        updateItem('entities', entitiesAsList);

        // Update illustration data for illustration entities
        if (key[0] === 'I') {
          updateItem(`illustrations__${key}`, value);
        }

        // Update project data for project entities
        if (key[0] === 'P') {
          updateItem(`projects__${key}`, value);
        }
      },
    ),
  );
}
