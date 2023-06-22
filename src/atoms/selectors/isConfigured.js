import { selector } from 'recoil';
import settingsAtom from '../settings/atom';

const KEY = 'isConfigured';

/**
 * Whether the app is configured
 * @type {selector}
 */
const isConfigured = selector({
  key: KEY,
  get: ({ get }) => {
    const settings = get(settingsAtom);
    return (
      !!settings['aws-id'] && !!settings['aws-secret']
      && !!Object.keys(settings.box_tokens).length
    );
  },
});

export default isConfigured;
