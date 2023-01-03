import { useRecoilState } from 'recoil';
import atomFamily from './atom';

export function useIllustration(id) {
  return useRecoilState(atomFamily(id));
}
