import { useRecoilState } from 'recoil';
import atom from './atom';

export function useEntities() {
  return useRecoilState(atom);
}
