import { useEffect, useState } from 'react'; 
import { resolveResource } from '@tauri-apps/api/path';

const UseLoadAi2html = () => {
  const [scriptPath, setScriptPath] = useState(null);

  const loadAi2html = async () => {
    const ai2htmlPath = await resolveResource('ai2html.js');
    setScriptPath(ai2htmlPath);
  }

  useEffect(() => {loadAi2html()}, []);
  return scriptPath; 

}

export {UseLoadAi2html}; 