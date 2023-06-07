import { useRef, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import nowAtom from './atom';

/**
 * This hook registers an effect to update the current time periodically.
 *
 * This hook is intended to be used by a Recoil initialization component that
 * sets up the Recoil store on the client side.
 */
export const useActivateTime = function useActivateTime(opts = {}) {
  const {
    interval = 1000 * 15, // 15s
  } = opts;

  const setTime = useSetRecoilState(nowAtom);
  const timer = useRef();
  useEffect(() => {
    const updateNow = () => {
      setTime(new Date());
      timer.current = setTimeout(updateNow, interval);
    };
    updateNow();
    return () => clearTimeout(timer.current);
  }, [setTime, interval]);
};
