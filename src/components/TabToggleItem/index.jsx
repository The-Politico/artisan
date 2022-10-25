import { Tab } from '@headlessui/react';
import cls from 'classnames';
import BaseIcon from '../BaseIcon';
import styles from './TabToggleItem.module.css';
import { borders, effects } from '../../theme';

export default function TabToggleItem({ size = '20', iconName }) {
  function tabClass(selected) {
    return cls(borders.roundedLg, effects.transition, styles.tab, {
      [styles.isActive]: selected,
    });
  }

  return (
    <Tab className={({ selected }) => tabClass(selected)}>
      <BaseIcon
        size={size}
        iconName={iconName}
      />
    </Tab>
  );
}
