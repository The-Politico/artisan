import { useState } from 'react';
import ExportToolbar from '../ExportToolbar';

export default function ExportPage({ config }) {
  const illosList = config.illos;
  const [selectedIllo, setSelectedIllo] = useState(illosList[0]);

  console.log(config);
  return (
    <div>
      <ExportToolbar
        illosList={illosList}
        selectedIllo={selectedIllo}
        setSelectedIllo={setSelectedIllo}
      />
      <div>
        Currently showing:
        {' '}
        {selectedIllo.title}
      </div>
    </div>
  );
}
