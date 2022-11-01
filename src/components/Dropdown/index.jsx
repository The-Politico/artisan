import { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';

import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

import cls from 'classnames';
import styles from './styles.module.css';

export default function Example(props) {
  const { optionsList } = props;
  const [selected, setSelected] = useState(optionsList[0]);

  return (
    <div className={styles.container}>
      <Listbox value={selected} onChange={setSelected}>
        <div className={styles.innerContainer}>
          <Listbox.Button className={styles.listButton}>
            <span className={styles.buttonSpan}>{selected.title}</span>
            <span className={styles.buttonIcon}>
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
            <Listbox.Options className={styles.listOptions}>
              {optionsList.map((illo) => (
                <Listbox.Option
                  key={illo.title + illo.path}
                  className={({ active }) => `${
                    active ? styles.optionActive : styles.optionInActive
                  }`}
                  value={illo}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`${
                          selected
                            ? styles.selectedText : styles.notSelectedText
                        }`}
                      >
                        {illo.title}
                      </span>
                      {selected ? (
                        <span className={styles.selectedSpan}>
                          <CheckIcon
                            className={styles.checkIcon}
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
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
