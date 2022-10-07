import cls from 'classnames';
import React, { useCallback } from 'react';
import styles from './Button.module.css';
import { layout } from '../../nes';

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
    variant = 'solid',
    children,
    disabled = false,
    className = '',
    onClick = () => null,
  } = props;
  const btnClass = cls(
    styles.btn,
    styles[variant],
    layout.flex,
    layout.flexCenter,
    className,
  );

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
