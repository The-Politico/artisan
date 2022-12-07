import cls from 'classnames';
import { useState, useEffect } from 'react';
import store from '../../store';
import Input from '../Input';
import Button from '../Button';
import { flex, layout, margin, padding, colors, typography as type} from '../../theme';
import styles from './styles.module.css';
import ProjectsFolder from './ProjectsFolder';

export default function SettingsPanel() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectsDir, setProjectsDir] = useState('');

  const panelClass = cls(
    styles.panel,
    padding.p4,
    flex.flex,
    flex.flexCol,
    layout.itemsCenter,
  );

  const handleClick = async () => {
    await store.updateSettings({
      authorName: name,
      authorEmail: email,
    });
  };

  useEffect(() => {
    (async () => {
      const { authorName, authorEmail, workingDir } =
        await store.getSettings();

      setName(authorName);
      setEmail(authorEmail);
      setProjectsDir(workingDir);
    })();
  }, []);

  return (
    <div className={panelClass}>
      <h3 className={cls(colors.textSlate700, type.fontSemibold)}>Settings</h3>
      <Input
        inputLabel="Full Name"
        setTextInput={setName}
        value={name}
      />
      <div className={styles.divider} />
      <Input
        inputLabel="Email"
        setTextInput={setEmail}
        value={email}
      />
      <div className={styles.divider} />
      <Button
        className={cls(margin.mt4)}
        variant="solid"
        onClick={handleClick}
      >
        Save
      </Button>
      <ProjectsFolder projectsDir={projectsDir} isInitial={false} />
    </div>
  );
}
