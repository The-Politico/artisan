import React from 'react';
import { useLayoutBreakpoints } from 'ai2jsx';

import md from './md';
import sm from './sm';
import lg from './lg';

const LAYOUTS = {
  md: {
    breakpoint: 658,
    component: md,
  },
  sm: {
    breakpoint: 300,
    component: sm,
  },
  lg: {
    breakpoint: 850,
    component: lg,
  },
};

const Map = () => {
  const layout = useLayoutBreakpoints(LAYOUTS);

  return (
    <div className='ai-map'>
      {layout}
    </div>
  );
};

export default Map;
