import cls from 'classnames';
import { Switch } from '@headlessui/react';
import styles from './styles.module.css';

import {
  flex,
  padding,
  borders,
  colors,
  layout,
} from '../../theme';

export default function ArtisanSwitch({ switchLabel, enabled, setToggle }) {
  const changeHandler = (val) => {
    setToggle(val);
  };

  const switchClass = cls(
    styles.switch,
    colors.bgSlate900,
    {
      [styles.enabled]: enabled,
      [styles.disabled]: !enabled,
    },
  );

  const knobClass = cls(
    styles.knob,
    borders.roundedFull,
    { [styles.knobEnabled]: enabled },
    { [styles.knobDisabled]: !enabled },
  );

  const labelClass = cls(styles.label, padding.pt2);
  const containerClass = cls(
    flex.flex,
    flex.flexCol,
    styles.container,
    layout.itemsCenter,
  );

  return (

    <div className={containerClass}>
      <Switch.Group>
        <Switch
          checked={enabled}
          onChange={changeHandler}
          className={switchClass}
        >
          <span
            aria-hidden="true"
            className={knobClass}
          />
        </Switch>
        <Switch.Label passive className={labelClass}>
          {switchLabel}
        </Switch.Label>

      </Switch.Group>
    </div>

  );
}
