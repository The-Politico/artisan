import { selector } from 'recoil';
import previewAtom from '../preview/atom';

const KEY = 'isPreviewActive';

/**
 * Whether a preview is active
 * @type {selector}
 */
const isPreviewActive = selector({
  key: KEY,
  get: ({ get }) => {
    const preview = get(previewAtom);
    return !!preview.process;
  },
});

export default isPreviewActive;
