import cls from 'classnames';
import React, { useCallback, forwardRef } from 'react';
import styles from './styles.module.css';
import {
  flex, effects, typography as type, margin,
} from '../../theme';
import BaseIcon from '../BaseIcon';

/**
 * Render a button with a full-sized icon and label
 * @param {Object} props
 * @param {Boolean} [props.disabled] - Set disabled state
 * @param {String} [props.className] - Extra classes
 * @param {Function} [props.onClick] - onClick event listener
 * @param {Boolean} [props.setWhite] - Set to `true` to use the
 * alternate white version
 * @param {String} props.iconName - Hero icon component name. All names end in `Icon` (e.g. `"GlobeAltIcon"`) {@link https://heroicons.com/}
 * @param {String} props.label - Label of button below icon
 * @returns {React.ReactElement}
 */
const IconButton = forwardRef((props, ref) => {
  const {
    disabled = false,
    className = '',
    onClick = () => null,
    iconName,
    label,
    setWhite = false,
  } = props;

  const btnClass = cls(
    styles.btn,
    flex.flex,
    flex.flexCol,
    flex.flexCenter,
    effects.transition,
    className,
    { [styles.white]: setWhite },
  );

  const handleClick = useCallback(onClick, [onClick]);

  return (
    <button
      ref={ref}
      type="button"
      className={btnClass}
      onClick={handleClick}
      disabled={disabled}
    >
      <BaseIcon
        size="24"
        iconName={iconName}
        className={cls(styles.iconSm, margin.mb1)}
      />
      <span className={cls(styles.label, type.textXs)}>{label}</span>
    </button>
  );
});

export default IconButton;
