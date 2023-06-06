import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';

import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

import cls from 'classnames';

import {
  colors, typography, borders, padding, flex, margin, layout,
} from '../../theme';
import styles from './styles.module.css';

export default function Dropdown({ optionsList, selectedOption, setOption }) {
  const changeHandler = (val) => {
    setOption(val);
  };

  return (
    <div className={styles.container}>
      <Listbox value={selectedOption} onChange={changeHandler}>
        <div className={cls(
          styles.innerContainer,
          margin.mt1,
        )}
        >
          <Listbox.Button className={cls(
            styles.listButton,
            padding.py2,
            typography.textSm,
            colors.textSlate900,
            borders.roundedLg,
          )}
          >
            <span className={styles.buttonSpan}>{selectedOption}</span>
            <span className={cls(
              styles.buttonIcon,
              padding.pr2,
              flex.flex,
              layout.itemsCenter,
            )}
            >
              <ChevronUpDownIcon
                className={styles.chevronIcon}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className={cls(
              styles.listOptions,
              typography.textSm,
              margin.mt1,
              borders.roundedMd,
            )}
            >
              {optionsList.map((illo) => (
                <Listbox.Option
                  key={illo}
                  className={({ active }) => `${
                    active ? cls(
                      styles.option,
                      styles.optionActive,
                      colors.bgSlate600,
                      padding.py2,
                    ) : cls(
                      styles.option,
                      colors.textSlate900,
                      padding.py2,
                    )
                  }`}
                  value={illo}
                >
                  {({ selected }) => (
                    <span
                      className={`${
                        selected
                          ? cls(
                            styles.optionText,
                            typography.fontBold,
                          )
                          : cls(
                            styles.optionText,
                            typography.fontNormal,
                          )
                      }`}
                    >
                      {illo}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
