import { useState } from 'react';
import cls from 'classnames';
import { Switch } from '@headlessui/react';
import styles from './styles.module.css';

import {
  flex,
} from '../../theme';

export default function ArtisanSwitch(props) {
  const { switchLabel } = props;
  const [enabled, setEnabled] = useState(false);
  const switchClass = cls(
    styles.switch,
    { [styles.enabled]: enabled },
    { [styles.disabled]: !enabled },
  );

  const knobClass = cls(
    styles.knob,
    { [styles.knobEnabled]: enabled },
    { [styles.knobDisabled]: !enabled },
  );

  const labelClass = cls(styles.label);
  const containerClass = cls(flex.flex, flex.flexCenter, flex.flexCol);

  return (

    <div className={containerClass}>
      <Switch.Group>
        <Switch
          checked={enabled}
          onChange={setEnabled}
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
