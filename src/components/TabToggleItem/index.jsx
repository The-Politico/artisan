import { Tab } from '@headlessui/react';
import cls from 'classnames';
import BaseIcon from '../BaseIcon';
import styles from './TabToggleItem.module.css';
import { borders, effects } from '../../theme';

/**
 * Renders a Tab item for use in `<Tab.Group>`
 * @param {Object} props
 * @param {Object} props.iconName Name of Heroicon component to use
 * @returns {JSX.Element}
 */
export default function TabToggleItem({ size = '20', iconName }) {
  const tabClass = cls(styles.tab, borders.roundedLg, effects.transition);

  return (
    <Tab className={tabClass}>
      <BaseIcon
        size={size}
        iconName={iconName}
      />
    </Tab>
  );
}
