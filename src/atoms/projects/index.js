import { useRecoilState } from 'recoil';
import atomFamily from './atom';

export function useProject(id) {
  return useRecoilState(atomFamily(id));
}
