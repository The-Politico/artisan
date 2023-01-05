import cls from 'classnames';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
  flex,
  layout,
  padding,
  colors,
  typography as type,
  borders,
  effects,
  transitions,
} from '../../theme';
import styles from './styles.module.css';
import SettingsForm from '../SettingsForm';

export default function SettingsPopover() {
  const panelClass = cls(
    styles.panel,
    padding.p4,
    padding.pb4,
    flex.flex,
    flex.flexCol,
    layout.itemsCenter,
    borders.roundedLg,
    effects.shadowLg,
  );

  return (
    <Transition
      as={Fragment}
      {...transitions.popover}
    >
      <Popover.Panel className={panelClass}>
        <h3 className={cls(colors.textSlate700, type.fontSemibold)}>
          Settings
        </h3>
        <SettingsForm />
      </Popover.Panel>
    </Transition>
  );
}
