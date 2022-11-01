import { PlusIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import Button from '../Button';
import cls from './ActionTestingView.module.scss';

import store from '../../store';

import initialize from '../../actions/initialize';
import createProject from '../../actions/createProject';
import openInFinder from '../../actions/openInFinder';
import createIllustration from '../../actions/createIllustration';
import openIllustration from '../../actions/openIllustration';
import generateIllustration from '../../actions/generateIllustration';
import shutdownPreview from '../../actions/shutdownPreview';
import launchPreview from '../../actions/launchPreview';
import archiveProject from '../../actions/archiveProject';
import deleteIllustration from '../../actions/deleteIllustration';
import publishProject from '../../actions/publishProject';
import downloadProject from '../../actions/downloadProject';
import duplicateProject from '../../actions/duplicateProject';
import deleteProject from '../../actions/deleteProject';
import { getProjectsArchive } from '../../actions/get-projects-archive';

function SettingsWatcher() {
  const [settings, setSettings] = useState({});
  const [projects, setProjects] = useState({});
  const [projectOne, setProjectOne] = useState({});
  const [preview, setPreview] = useState({});
  const [archive, setArchive] = useState({});

  useEffect(() => {
    const interval = setInterval(async () => {
      const newSettings = await store.getSettings();
      setSettings(newSettings);

      const newProjects = await store.getProjectsList();
      setProjects(newProjects);

      const newProjOne = await store.getProject('project-one');
      setProjectOne(newProjOne);

      const newPreview = await store.getPreview();
      setPreview(newPreview);

      const newArchive = await getProjectsArchive();
      setArchive(newArchive);
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div>
      <h2>Settings</h2>
      <textarea
        readOnly
        style={{ width: '100%', height: '200px' }}
        value={JSON.stringify(
          {
            settings,
            projects,
            projectOne,
            preview,
            archive,
          },
          null,
          2,
        )}
      />
    </div>
  );
}

export default function ActionTestingView() {
  const TestButton = ({ onClick, name }) => (
    <div>
      <Button
        variant="solid"
        className="text-lg"
        onClick={onClick}
      >
        <PlusIcon className="h-6 mr-1" />
        {name}
      </Button>
      <br />
    </div>
  );

  return (
    <div className={cls.view}>
      <SettingsWatcher />

      <br />
      <h2>Actions</h2>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <TestButton
          name="Initialize"
          onClick={() => initialize()}
        />

        <TestButton
          name="Create Project"
          onClick={() => createProject('Project One')}
        />

        <TestButton
          name="Open in Finder"
          onClick={() => openInFinder('project-one')}
        />

        <TestButton
          name="Create Illustration"
          onClick={() =>
            createIllustration('project-one', 'My Cool Illustration')
          }
        />

        <TestButton
          name="Create Illustration Two"
          onClick={() =>
            createIllustration('project-one', 'My Second Illustration')
          }
        />

        <TestButton
          name="Delete Illustration Two"
          onClick={() =>
            deleteIllustration('project-one', 'my-second-illustration')
          }
        />

        <TestButton
          name="Open Illustration"
          onClick={() =>
            openIllustration('project-one', 'my-cool-illustration')
          }
        />

        <TestButton
          name="Generate Illustration"
          onClick={() =>
            generateIllustration('project-one', 'my-cool-illustration')
          }
        />

        <TestButton
          name="Launch Preview"
          onClick={() => launchPreview('project-one')}
        />

        <TestButton
          name="Shutdown Preview"
          onClick={() => shutdownPreview()}
        />

        <TestButton
          name="Publish Project"
          onClick={() => publishProject('project-one')}
        />

        <TestButton
          name="Archive Project"
          onClick={() => archiveProject('project-one')}
        />

        <TestButton
          name="Download Project"
          onClick={() => downloadProject('project-one')}
        />

        <TestButton
          name="Duplicate Project"
          onClick={() => duplicateProject('project-one', 'project-two')}
        />

        <TestButton
          name="Delete Project"
          onClick={() => deleteProject('project-one')}
        />
      </div>
    </div>
  );
}

// <Button
// variant="solid"
// className="text-lg"
// // onClick={() => downloadTemplate()}
// onClick={() => CreateProject('proj-1')}
// >
// <PlusIcon className="h-6 mr-1" />
// Create Project

// </Button>
// <br />
// <Button
// variant="solid"
// className="text-lg"
// // onClick={() => downloadTemplate()}
// onClick={() => CreateIllustration('proj-1', 'test-illo')}
// >
// <PlusIcon className="h-6 mr-1" />
// Create Illustration
// </Button>
// <br />
// <Button
// variant="solid"
// className="text-lg"
// // onClick={() => downloadTemplate()}
// onClick={() => OpenIllustration('proj-1', 'test-illo')}
// >
// Open Illustration
// </Button>
// <br />
// <Button
// variant="solid"
// className="text-lg"
// // onClick={() => downloadTemplate()}
// onClick={() => Generate('proj-1', 'test-illo')}
// >
// Generate
// </Button>
// <br />
// <Button
// variant="solid"
// className="text-lg"
// onClick={() => Preview('proj-1')}
// >
// Preview

// </Button>
// <br />
// <Button
// variant="solid"
// className="text-lg"
// onClick={() => OutputShare('proj-1')}
// >
// Output Share

// </Button>
// <br />
// <Button
// variant="solid"
// className="text-lg"
// >
// <a
//   target="_blank"
//   href={getSharePage('proj-1')}
//   rel="noreferrer"
// >
//   Test Share
// </a>

// </Button>
// <br />
// <Button
// variant="solid"
// className="text-lg"
// onClick={() => DuplicateProject('proj-1', 'proj-2')}
// >
// Duplicate Project

// </Button>
// <br />
// <Button
// variant="solid"
// className="text-lg"
// onClick={() => DeleteIllustration('proj-1', 'test-illo')}
// >
// Delete Illustration

// </Button>
// <br />
