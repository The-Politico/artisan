import { useRecoilState } from 'recoil';
import atom from './atom';

export default function useEntities() {
  return useRecoilState(atom);
}
