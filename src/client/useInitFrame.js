import { useEffect } from 'react';
import { initFrame } from '@newswire/frames';

const useInitFrame = LAYOUTS => {
  useEffect(() => {
    initFrame();
  }, []);
};

export default useInitFrame;
