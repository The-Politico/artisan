import cls from 'classnames';
import Dropdown from '../Dropdown';
import styles from './styles.module.css';

export default function ExportToolbar({
  illos,
  selectedIllo,
  setSelectedIllo,
}) {
  return (
    <Dropdown
      illosList={illos}
      selectedIllo={selectedIllo}
      setSelectedIllo={setSelectedIllo}
    />
  );
}
