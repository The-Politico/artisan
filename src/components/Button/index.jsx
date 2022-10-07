import classNames from 'classnames';
import React, { useCallback } from 'react';
import cls from './Button.module.css';

/**
 * @param {Object} props
 * @param {"solid" | "outline" | "ghost"} props.variant - Button style variant
 * @param {Boolean} [props.disabled] - Set disabled state
 * @param {String} [props.className] - Extra classes
 * @param {React.ReactNode} [props.children] - Children elements
 * @param {Function} [props.onClick] - onClick event listener
 * @returns {React.ReactElement}
 */
export default function Button(props) {
  const {
    variant = 'ghost',
    children,
    disabled = false,
    className = '',
    onClick = () => null,
  } = props;
  const btnClass = classNames(cls.btn, cls[`btn-${variant}`], className);

  const handleClick = useCallback(onClick, [onClick]);

  return (
    <button
      type="button"
      className={btnClass}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
