import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import cls from 'classnames';
import MeatballItem from '../MeatballItem';
import styles from './styles.module.css';
import {
  colors, effects, padding, borders,
} from '../../theme';

export default function MeatballMenu({ items, children, active = true }) {
  const itemsClass = cls(
    styles.items,
    padding.p1,
    borders.roundedMd,
    effects.shadowLg,
    colors.bgSlate50,
  );

  if (!active) {
    return null;
  }

  return (
    <Menu
      as="div"
      className={styles.menu}
    >
      <Menu.Button className={cls(styles.menuBtn, borders.rounded)}>
        <EllipsisHorizontalIcon
          className={cls(styles.iconSm, colors.textSlate600)}
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter={cls(effects.transition, styles.enter)}
        enterFrom={styles.enterFrom}
        enterTo={styles.enterTo}
        leave={cls(effects.transitionm, styles.leave)}
        leaveFrom={styles.leaveFrom}
        leaveTo={styles.leaveTo}
      >
        <Menu.Items className={itemsClass}>
          {items
            ? items.map((item) => (
              <MeatballItem
                key={item.label}
                {...item}
              />
            ))
            : children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
