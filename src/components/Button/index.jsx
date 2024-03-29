import cls from 'classnames';
import React, { useCallback, forwardRef } from 'react';
import styles from './styles.module.css';
import {
  flex, padding, effects, borders,
} from '../../theme';

/**
 * Render a button in one of three styles
 * @param {Object} props
 * @param {'solid' | 'outline' | 'ghost'} props.variant - Button style variant
 * @param {Boolean} [props.disabled] - Set disabled state
 * @param {String} [props.className] - Extra classes
 * @param {React.ReactNode} [props.children] - Children elements
 * @param {Function} [props.onClick] - onClick event listener
 * @param {React.ReactElement} [props.icon] - Hero icon component {@link https://heroicons.com/}
 * @param {String} [props.value] - Button text.
 * Use instead of passing child text
 * @returns {JSX.Element}
 */
const Button = forwardRef((props, ref) => {
  const {
    variant = 'solid',
    children,
    disabled = false,
    submit = false,
    className = '',
    onClick = () => null,
    icon = null,
    value = null,
  } = props;

  const btnClass = cls(
    styles[variant],
    borders.roundedFull,
    flex.flex,
    flex.flexCenter,
    padding.px4,
    padding.py1,
    effects.transition,
    className,
  );

  const handleClick = useCallback(onClick, [onClick]);

  return (
    <button
      ref={ref}
      type={submit ? 'submit' : 'button'}
      className={btnClass}
      onClick={handleClick}
      disabled={disabled}
    >
      {icon}
      <span>{value || children}</span>
    </button>
  );
});

export default Button;
