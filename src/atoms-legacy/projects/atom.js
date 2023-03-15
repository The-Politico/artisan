import { atomFamily } from 'recoil';
import { syncEffect } from 'recoil-sync';
import {
  string, object, jsonDate, nullable, literal,
} from '@recoiljs/refine';

export default atomFamily({
  key: 'projects',
  default: [],
  effects: (id) => ([
    syncEffect({
      itemKey: `projects__${id}`,
      storeKey: 'store',
      refine: object({
        id: string(),
        version: string(),
        type: literal('project'),
        name: string(),
        slug: string(),
        lastUpdated: nullable(jsonDate()),
        lastUploaded: nullable(jsonDate()),
        lastPublished: nullable(jsonDate()),
      }),
    }),
  ]),
});
