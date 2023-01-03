import { atomFamily } from 'recoil';
import { syncEffect } from 'recoil-sync';
import {
  string, object, literal, nullable,
} from '@recoiljs/refine';

export default atomFamily({
  key: 'illustrations',
  default: [],
  effects: (id) => ([
    syncEffect({
      itemKey: `illustrations__${id}`,
      storeKey: 'store',
      refine: object({
        id: string(),
        type: literal('illustration'),
        name: string(),
        slug: string(),
        project: string(),
        fallback: nullable(string()),
      }),
    }),
  ]),
});
