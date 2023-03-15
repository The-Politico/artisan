import { selector } from 'recoil';
import previewAtom from '../preview/atom';

/**
 * Whether a preview is active
 * @type {selector}
 */
const isPreviewActive = selector({
  key: 'isPreviewActive',
  get: ({ get }) => {
    const preview = get(previewAtom);
    return !!preview.process;
  },
});

export default isPreviewActive;
