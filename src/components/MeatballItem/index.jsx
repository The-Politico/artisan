import { Menu } from '@headlessui/react';
import { useCallback } from 'react';
import cls from 'classnames';
import styles from './styles.module.css';
import {
  flex,
  padding,
  borders,
  typography as type,
  effects,
} from '../../theme';
import Icon from './Icon';

export default function MeatballItem({
  label, iconName, action, danger,
}) {
  const onClick = useCallback(action, [action]);

  const renderItem = ({ active }) => {
    const itemClass = cls(
      flex.flex,
      flex.itemsCenter,
      padding.p2,
      type.textSm,
      type.fontMedium,
      borders.roundedMd,
      effects.transition,
      styles.item,
      { [styles.isActive]: active, [styles.isDanger]: danger },
    );
    return (
      <button
        className={itemClass}
        type="button"
        onClick={onClick}
      >
        <Icon iconName={iconName} />
        {label}
      </button>
    );
  };

  return <Menu.Item>{renderItem}</Menu.Item>;
}
