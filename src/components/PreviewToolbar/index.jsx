import cls from 'classnames';

import ArtisanSwitch from '../ArtisanSwitch';
import Dropdown from '../Dropdown';
import IconButton from '../IconButton';
import TabToggle from '../TabToggle';

import {
  flex,
  padding,
  layout,
} from '../../theme';

import styles from './styles.module.css';

export default function PreviewToolbar({
  illoList,
  illo, setIllo,
  embedList,
  embedType, setEmbedType,
  showArticle, setShowArticle,
  selectedIndex, setSelectedIndex,
  items,
}) {
  const containerClass = cls(
    flex.flex,
    flex.flexRow,
    styles.container,
  );

  const itemContainerClass = cls(
    flex.flex,
    flex.flexCol,
    layout.itemsCenter,
  );

  const reloadHandler = () => {
    window.location.reload(true);
  };

  return (
    <div className={containerClass}>
      <ArtisanSwitch
        switchLabel="Show Article"
        enabled={showArticle}
        setToggle={setShowArticle}
      />

      <div className={itemContainerClass}>
        <Dropdown
          optionsList={illoList}
          selectedOption={illo}
          setOption={setIllo}
        />
        <span className={styles.label}>Illustration</span>
      </div>

      <IconButton
        iconName="ArrowPathIcon"
        label="Reload"
        setWhite
        onClick={reloadHandler}
        className={styles.iconOverride}
      />

      <div className={itemContainerClass}>
        <Dropdown
          optionsList={embedList}
          selectedOption={embedType}
          setOption={setEmbedType}
        />
        <span className={styles.label}>Embed Width</span>
      </div>
      <div className={itemContainerClass}>
        <TabToggle
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          items={items}
          size="24"
          transparent
        />
        <span className={styles.label}>Screen Size</span>
      </div>
    </div>
  );
}
