import { useState } from 'react';
import ExportToolbar from '../ExportToolbar';

export default function ExportPage({ config }) {
  const options = config.illos;
  const [selectedOption, setOption] = useState(options[0]);

  console.log(selectedOption);

  console.log(config);
  return (
    <div>
      <ExportToolbar
        options={options}
        selectedOption={selectedOption}
        setOption={setOption}
      />
      <div>
        Currently showing:
        {' '}
        {selectedOption.title}
      </div>
    </div>
  );
}
