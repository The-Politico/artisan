import cls from 'classnames';
import React, { useCallback } from 'react';
import * as icon from '@heroicons/react/24/solid';
import styles from './IconButton.module.css';
import {
  flex, effects, typography as type, margin,
} from '../../theme';

/**
 * @param {Object} props
 * @param {Boolean} [props.disabled] - Set disabled state
 * @param {String} [props.className] - Extra classes
 * @param {Function} [props.onClick] - onClick event listener
 * @param {String} props.iconName - Hero icon component name. All names end in `Icon` (e.g. `"GlobeAltIcon"`) {@link https://heroicons.com/}
 * @param {String} props.label - Label of button below icon
 * @returns {React.ReactElement}
 */
export default function IconButton(props) {
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
    setWhite && styles.white,
    flex.flex,
    flex.flexCol,
    flex.flexCenter,
    effects.transition,
    className,
  );

  const handleClick = useCallback(onClick, [onClick]);

  const renderIcon = () => {
    const Icon = icon[iconName];
    return <Icon className={cls(styles.iconSm, margin.mb1)} />;
  };

  return (
    <button
      type="button"
      className={btnClass}
      onClick={handleClick}
      disabled={disabled}
    >
      {renderIcon()}
      <span className={cls(styles.label, type.textXs)}>{label}</span>
    </button>
  );
}