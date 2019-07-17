import React from 'react';
import { useLayoutBreakpoints } from 'ai2jsx';

import desktop from './desktop';
import mobile from './mobile';

const LAYOUTS = {
  desktop: {
    breakpoint: 720,
    component: desktop,
  },
  mobile: {
    breakpoint: 300,
    component: mobile,
  },
};

const Graph = () => {
  const layout = useLayoutBreakpoints(LAYOUTS);

  return (
    <div className='ai-graph'>
      {layout}
    </div>
  );
};

export default Graph;
