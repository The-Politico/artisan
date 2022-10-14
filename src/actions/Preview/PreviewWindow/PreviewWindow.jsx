// this is aaron's hard work from Discovery: https://github.com/aaronalbright/artisan-prototype-design/blob/main/src/output-preview/AppWindow.jsx
import { readDir } from '@tauri-apps/api/fs';
import { documentDir, resolve, join } from '@tauri-apps/api/path';
import { Command } from '@tauri-apps/api/shell';
import { appWindow } from '@tauri-apps/api/window';
import { useEffect, useState, useRef, useCallback} from 'react';
import cls from './styles.module.css';

function PreviewWindow({projectSlug}) {
  const [child, setChild] = useState(null);
  const iframeRef = useRef(null);
  const url = 'http://localhost:8080';

  async function getOutputPath() {
    const docsPath = await documentDir();
    const projectDir = await join(docsPath, 'Artisan', 'Projects', projectSlug);
    const entries = await readDir( projectDir, {
      recursive: true,
    });

    const illoPaths = [];

    entries.forEach((entry) => {

      if ('children' in entry){
        const outputPath = entry.path + '/ai2html-output/';
        illoPaths.push(outputPath);
      }

    });

    return illoPaths[0];
  }

  const spawnServer = useCallback(async () => {
    console.log('Spawning server');
    const path = await getOutputPath();
    const command = new Command(
      'start-local-server',
      ['-m', 'http.server', '8080'],
      { cwd: path },
    );
    const childProcess = await command.spawn();
    setChild(childProcess);
    await appWindow.onCloseRequested(async () => {
      await childProcess.kill();
    });
    // setUrl('http://localhost:8080')
  }, []);

  async function killProcess(process) {
    await process.kill();
  }

  useEffect(() => {
    spawnServer();
    return () => {
      console.log("Unmounting");
      console.log(child);
      if (child) {
        console.log("Killing child");
        killProcess(child);
      }
    }
  }, [spawnServer]);

  return (
    <>
      <h1>cms embed preview</h1>
      {/* <p>Child process {child?.pid}</p> */}
      <iframe
        ref={iframeRef}
        className={cls.iframe}
        src={url}
        frameBorder="0"
      ></iframe>
    </>
  );
}

export default PreviewWindow;