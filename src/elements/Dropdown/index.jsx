import cls from 'classnames';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Listbox } from '@headlessui/react';
import styles from './styles.module.css';

export default function Dropdown({
  illosList,
  selectedIllo,
  setSelectedIllo,
}) {
  return (
    <div className={styles.dropdownContainer}>
      <h3 className={styles.label}>Project Illustrations</h3>
      <Listbox
        value={selectedIllo}
        onChange={setSelectedIllo}
      >
        <Listbox.Button className={styles.button}>
          <span className={styles.selectedText}>{selectedIllo.name}</span>
          <span className={styles.selectedIcon}>
            <ChevronUpDownIcon className={styles.icon} />
          </span>
        </Listbox.Button>
        <Listbox.Options className={styles.options}>
          {illosList.map((illo) => (
            <Listbox.Option
              key={illo.name}
              value={illo}
              className={({ active }) => cls(
                styles.optionItem, { [styles.active]: active },
              )}
            >
              {illo.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
