import cls from 'classnames';
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
import atoms from '../../atoms';

export default function WelcomeModal() {
  const isConfigured = atoms.useRecoilValue(
    atoms.isConfigured,
  );

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
      open={!isConfigured}
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
            First, configure your app.
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
              isWelcome
            />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
