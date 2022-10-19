import classNames from 'classnames';
import React from 'react';
import cls from './Button.module.scss';

/**
 * @param {Object} props
 * @param {"solid" | "outline" | "ghost"} props.variant - Button style variant
 * @param {Boolean} [props.disabled] - Set disabled state
 * @param {String} [props.className] - Extra classes
 * @param {React.ReactElement} [props.children] - Children elements
 * @returns {React.ReactElement}
 */
export default function Button(props) {
  const {
    variant,
    children,
    disabled = false,
    className = '',
    onClick = null,
  } = props;
  const btnClass = classNames(cls.button, cls[variant], className);
  return (
    <button
      type="button"
      className={btnClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
