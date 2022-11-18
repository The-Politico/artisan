import { Tab } from '@headlessui/react';
import cls from 'classnames';
import TabToggleItem from '../TabToggleItem';
import styles from './styles.module.css';

export default function TabToggle({
  selectedIndex,
  setSelectedIndex,
  items,
  size,
  transparent,
}) {
  return (
    <Tab.Group
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
    >
      <Tab.List
        className={cls(styles.tabList, {
          [styles.transparentBg]: transparent,
        })}
      >
        <span
          style={{
            '--translate': selectedIndex,
          }}
          className={cls(styles.glider)}
        />
        {items.map((item) => (
          <TabToggleItem
            iconName={item}
            key={item}
            size={size}
          />
        ))}
      </Tab.List>
    </Tab.Group>
  );
}
