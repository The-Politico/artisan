import cls from 'classnames';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import {
  borders,
  colors,
  margin,
  padding,
  typography as type,
} from '../../theme';
import Input from '../Input';
import styles from './styles.module.css';

export default function Advanced({
  isInitial,
  projectsDir,
  setProjestDir,
  port,
  setPort,
}) {
  if (!isInitial) {
    return (
      <Disclosure
        as="div"
        className={cls(styles.advanced)}
      >
        {({ open }) => (
          <>
            <Disclosure.Button
              className={cls(
                styles.buttonDropdown,
                type.textSm,
                type.fontSemibold,
                colors.textSlate700,
                margin.mb2,
              )}
            >
              Advanced
              <ChevronUpIcon
                className={cls(styles.icon, { [styles.iconReverse]: open })}
              />
            </Disclosure.Button>
            <Disclosure.Panel>
              <Input
                label="Preferred Port"
                value={port}
                setValue={setPort}
                className={styles.settingsInput}
              />

              <p className={cls(type.textSm, colors.textSlate700, margin.mb2)}>
                Projects Folder
              </p>
              <p className={cls(styles.dir, borders.roundedMd)}>
                {projectsDir}
              </p>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  }

  return <div />;
}
