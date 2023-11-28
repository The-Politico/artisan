/* eslint-disable jsx-a11y/no-static-element-interactions */
import { appWindow } from '@tauri-apps/api/window';
import styles from './styles.module.css';

export default function Titlebar() {
  const handleMouseDown = async (e) => {
    e.preventDefault();
    await appWindow.startDragging();
  };

  return (
    <div
      className={styles.titlebar}
      onMouseDown={handleMouseDown}
    />
  );
}
