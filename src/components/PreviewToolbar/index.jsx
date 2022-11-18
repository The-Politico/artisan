import cls from 'classnames';

import ArtisanSwitch from '../ArtisanSwitch';
import Dropdown from '../Dropdown';
import IconButton from '../IconButton';
import TabToggle from '../TabToggle';

import {
  flex,
  layout,
  margin,
  typography,
  padding,
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
    padding.p3,
  );

  const labelClass = cls(
    styles.label,
    typography.textSm,
  );

  const itemContainerClass = cls(
    flex.flex,
    flex.flexCol,
    layout.itemsCenter,
  );

  const reloadContainerClass = cls(
    flex.flex,
    flex.flexCol,
    layout.itemsCenter,
    margin.mt2,
  );

  const tabContainerClass = cls(
    flex.flex,
    flex.flexCol,
    layout.itemsCenter,
    styles.tabToggle,
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
        <span className={labelClass}>Illustration</span>
      </div>
      <div className={reloadContainerClass}>
        <IconButton
          iconName="ArrowPathIcon"
          label="Reload"
          setWhite
          onClick={reloadHandler}
          className={styles.iconOverride}
        />
      </div>

      <div className={itemContainerClass}>
        <Dropdown
          optionsList={embedList}
          selectedOption={embedType}
          setOption={setEmbedType}
        />
        <span className={labelClass}>Embed Width</span>
      </div>
      <div className={tabContainerClass}>
        <TabToggle
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          items={items}
          size="24"
          transparent
        />
        <span className={labelClass}>Screen Size</span>
      </div>
    </div>
  );
}
