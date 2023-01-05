import cls from 'classnames';
import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import styles from './styles.module.css';
import {
  effects,
  colors,
  padding,
  borders,
  flex,
  typography as type,
  layout,
  margin,
} from '../../theme';
import SettingsForm from '../SettingsForm';
import store from '../../store';

export default function WelcomeScreen() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { firstRun } = await store.getSettings();
      setIsOpen(firstRun);
    })();
  }, []);

  const panelClass = cls(
    styles.panel,
    flex.flex,
    flex.flexCol,
    layout.itemsCenter,
    padding.p8,
    borders.roundedLg,
    colors.bgWhite,
    effects.shadowLg,
  );

  return (
    <Dialog
      open={isOpen}
      onClose={() => null}
      className={styles.dialog}
    >
      <div className={styles.backdrop} />
      <div className={styles.container}>
        <Dialog.Panel className={panelClass}>
          <Dialog.Title
            className={cls(styles.title, type.text4Xl, type.fontSemibold)}
          >
            Welcome to Artisan!
          </Dialog.Title>
          <Dialog.Description
            className={cls(
              styles.desc,
              margin.my5,
              colors.textSlate600,
              type.textLg,
              type.fontSemibold,
            )}
          >
            First, fill in your information.
          </Dialog.Description>
          <div
            className={cls(
              styles.form,
              flex.flex,
              flex.flexCol,
              flex.flexCenter,
              padding.p6,
              borders.roundedLg,
            )}
          >
            <SettingsForm
              setIsOpen={setIsOpen}
              isFirstRun
            />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
