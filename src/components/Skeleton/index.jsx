import cls from 'classnames';
import React from 'react';
import styles from './styles.module.css';

/**
 * Skeleton component for loading content
 * @type {React.ComponentPropsWithoutRef}
 * @param {Object} props
 * @param {"rectangle"|"circle"} [props.variant] -
 * Display as rounded rectangle or cicle
 * @param {String} props.height Height of skeleton element
 * @param {String} props.width Width of skeleton element
 * @param {String} [props.className] Custom classes
 * @returns {import('react').ReactComponentElement}
 */
export default function Skeleton({
  variant = 'rectangle',
  height,
  width,
  className = '',
}) {
  return (
    <div
      className={cls(styles.skeleton, styles[variant], className)}
      style={{
        width,
        height,
      }}
    />
  );
}
