import cls from 'classnames';
import { Transition } from '@headlessui/react';
import Button from '../Button';
import styles from './styles.module.css';
import {
  colors,
  borders,
  effects,
  padding,
  flex,
  typography as type,
} from '../../theme';
import publishProject from '../../actions/publishProject';

export default function ConfirmPublishAlert({
  projectSlug,
  showPubilshAlert,
  setShowPublishAlert,
}) {
  const alertClass = cls(
    styles.alert,
    flex.flex,
    flex.flexCol,
    flex.flexCenter,
    padding.p4,
    colors.bgWhite,
    borders.roundedLg,
    effects.shadowLg,
  );

  const handlePublish = async () => {
    await publishProject(projectSlug);
  };

  const {
    enter, enterTo, enterFrom, leave, leaveFrom, leaveTo,
  } = styles;
  const timings = {
    enter,
    enterTo,
    enterFrom,
    leave,
    leaveFrom,
    leaveTo,
  };

  return (
    <Transition
      show={showPubilshAlert}
      className={styles.container}
      {...timings}
    >
      <div className={alertClass}>
        <h2 className={cls(colors.textSlate700, type.textLg, type.fontBold)}>
          Confirm Publish
        </h2>
        <p className={styles.note}>
          This will publish all illustrations publicly to the internet.
        </p>
        <div className={cls(flex.flex, flex.flexCenter)}>
          <Button
            value="Cancel"
            variant="ghost"
            onClick={() => setShowPublishAlert(false)}
          />
          <Button
            value="Publish"
            variant="solid"
            onClick={() => handlePublish()}
          />
        </div>
      </div>
    </Transition>
  );
}
