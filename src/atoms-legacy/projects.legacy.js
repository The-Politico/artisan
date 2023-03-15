import { atomFamily } from 'recoil';
import { syncEffect } from 'recoil-sync';
import {
  number, object, string, bool,
} from '@recoiljs/refine';
import store from '../store';

export default atomFamily({
  key: 'projects',
  default: {
    name: undefined,
    slug: undefined,
    isUploaded: false,
    isPublished: false,
  },
  effects: (param) => {
    const effects = [
      syncEffect({
        itemKey: `projects__${param}`,
        storeKey: 'store',
        refine: object({
          name: string(),
          slug: string(),
          isUploaded: bool(),
          isPublished: bool(),
        }),
      }),
    ];

    console.log(effects);
    return effects;
  },
  // effects: [
  //   ({ node }) => {
  //     const effect = async () => {
  //       const key = node.key.split('__')[1].match(/^"(.*)"$/)[1];
  //       await store.getProject();
  //     };

  //     effect();
  //   },
  // ],
});
