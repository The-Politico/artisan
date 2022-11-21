import cls from 'classnames';
import { useState, useEffect } from 'react';
import store from '../../store';
import Input from '../Input';
import Button from '../Button';
import { flex } from '../../theme';

export default function SettingsPanel() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectsDir, setProjectsDir] = useState('');

  useEffect(() => {
    (async () => {
      const {
        authorName,
        authorEmail,
        workingDir,
      } = await store.getSettings();

      setName(authorName);
      setEmail(authorEmail);
      setProjectsDir(workingDir);
    })();
  });

  return (
    <div>
      <Input
        inputLabel="Full Name"
        setTextInput={setName}
      />
      <div className='divider' />
      <Input
        inputLabel="Email"
        setTextInput={setEmail}
      />
       <div className='divider' />
      {/* <ProjectsFolderSelector> */}
    </div>
  );
}
