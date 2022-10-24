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

export default function MeatballItem({ label, icon, action }) {
  const handleClick = useCallback(action, [action]);
  const renderItem = ({ active }) => {
    const itemClass = cls(
      flex.flex,
      flex.itemsCenter,
      padding.p2,
      type.textSm,
      borders.roundedMd,
      effects.transition,
      styles.foobar,
      { [styles.active]: active },
    );
    return (
      <button
        className={itemClass}
        type="button"
        onClick={handleClick}
      >
        <Icon iconName={icon} />
        {label}
      </button>
    );
  };

  return <Menu.Item>{renderItem}</Menu.Item>;
}
