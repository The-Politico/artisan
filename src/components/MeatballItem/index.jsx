import { Menu } from '@headlessui/react';
import { useCallback } from 'react';
import cls from 'classnames';
import styles from './styles.module.css';
import {
  flex,
  padding,
  borders,
  margin,
  typography as type,
  effects,
} from '../../theme';
import BaseIcon from '../BaseIcon';

/**
 * Renders a button for a meatball menu item
 * @param {Object} props
 * @returns
 */
export default function MeatballItem({
  label, iconName, action, danger,
}) {
  const onClick = useCallback(action, [action]);

  // Pass active render prop to item class
  const itemClass = (isActive) => cls(
    styles.item,
    {
      [styles.isActive]: isActive,
      [styles.isDanger]: danger,
    },
    flex.flex,
    flex.itemsCenter,
    padding.p2,
    type.textSm,
    type.fontMedium,
    borders.roundedMd,
    effects.transition,
  );

  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={itemClass(active)}
          type="button"
          onClick={onClick}
        >
          <BaseIcon
            size="20"
            iconName={iconName}
            className={cls(styles.iconSm, margin.mr2)}
          />
          {label}
        </button>
      )}
    </Menu.Item>
  );
}
