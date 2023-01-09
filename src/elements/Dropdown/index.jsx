import cls from 'classnames';
import { Listbox } from '@headlessui/react';
import styles from './styles.module.css';

export default function Dropdown({ illos, selectedIllo, setSelectedIllo }) {
  return (
    <Listbox value={selectedIllo} onChange={setSelectedIllo}>
      <Listbox.Button>{selectedIllo}</Listbox.Button>
      <Listbox.Options>
        {illos.map((illo) => (
          <Listbox.Option
            key={illo.name}
            value={illo}
          >
            {illo.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
