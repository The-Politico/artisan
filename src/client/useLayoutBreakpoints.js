import { useState, useEffect } from 'react';
import { sendFrameHeight } from '@newswire/frames';
import debounce from 'lodash/debounce';

const NULL_COMPONENT = () => null;

const getWidth = () => {
  return window.innerWidth;
};

const useLayoutBreakpoint = LAYOUTS => {
  const [layout, updateLayout] = useState(NULL_COMPONENT);

  const findLayout = () => {
    const layoutKeys = Object.keys(LAYOUTS).sort((a, b) => LAYOUTS[b].breakpoint - LAYOUTS[a].breakpoint);
    const width = getWidth();

    if (width > LAYOUTS[layoutKeys[0]].breakpoint) {
      return LAYOUTS[layoutKeys[0]].component;
    }

    const lastIndex = layoutKeys.length - 1;
    if (width < LAYOUTS[layoutKeys[lastIndex]].breakpoint) {
      return LAYOUTS[layoutKeys[lastIndex]].component;
    }

    for (let key of layoutKeys) {
      const layoutConfig = LAYOUTS[key];
      if (width >= layoutConfig.breakpoint) {
        return layoutConfig.component;
      }
    }

    return NULL_COMPONENT;
  };

  useEffect(() => {
    const handleResize = () => {
      const newLayout = findLayout();
      if (newLayout !== layout) {
        updateLayout(newLayout);
      }
    };
    handleResize();
    window.addEventListener('resize', debounce(handleResize, 100));
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    sendFrameHeight();
  }, [layout]);

  return layout;
};

export default useLayoutBreakpoint;
