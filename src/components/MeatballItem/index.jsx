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

  const renderItem = ({ active }) => {
    const itemClass = cls(
      styles.item,
      {
        [styles.isActive]: active,
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
      <button
        className={itemClass}
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
    );
  };

  return <Menu.Item>{renderItem}</Menu.Item>;
}
