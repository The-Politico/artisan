import { useEffect, useState } from 'react'; 
import { resolveResource } from '@tauri-apps/api/path';

const UseLoadExportScript = () => {
  const [scriptPath, setScriptPath] = useState(null);

  const loadExportScript = async () => {
    const exportScriptPath = await resolveResource('exportArtboards.js');
    setScriptPath(exportScriptPath);
  }

  useEffect(() => {loadExportScript()}, []);
  return scriptPath; 

}

export {UseLoadExportScript}; 