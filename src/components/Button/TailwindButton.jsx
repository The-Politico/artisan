import "./Button-tw.scss";
import React from 'react';

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

  return (
    <button
      type="button"
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
