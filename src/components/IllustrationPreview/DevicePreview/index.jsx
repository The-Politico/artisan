import { ALL_BREAKPOINTS } from '../_constants/breakpoints';

import classes from './styles.module.css';

const DevicePreview = (props) => {
  const { breakpoint, children } = props;
  const { background, styles = {} } = ALL_BREAKPOINTS[breakpoint];

  return (
    <div
      className={classes['device-wrapper']}
      style={styles.wrapper}
    >
      {background && (
        <img
          className={classes.mockup}
          src={background}
          alt={breakpoint}
          style={styles.mockup}
        />
      )}

      <div
        className={classes['inner-content']}
        style={styles.inner}
      >
        {children}
      </div>
    </div>
  );
};

export default DevicePreview;
