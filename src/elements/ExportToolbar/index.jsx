import cls from 'classnames';
import Dropdown from '../Dropdown';
import ShareButton from '../ShareButton';
import styles from './styles.module.css';

export default function ExportToolbar({
  illosList,
  selectedIllo,
  setSelectedIllo,
}) {
  return (
    <div className={styles.toolbar}>
      <Dropdown
        illosList={illosList}
        selectedIllo={selectedIllo}
        setSelectedIllo={setSelectedIllo}
      />
      <ShareButton />
    </div>

  );
}
