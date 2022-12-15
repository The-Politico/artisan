import { PlusIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import Button from '../Button';
import cls from './styles.module.css';

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
import getProjectsArchive from '../../actions/getProjectsArchive';
import renameProject from '../../actions/renameProject';
import renameIllustration from '../../actions/renameIllustration';
import backupFiles from '../../actions/backupFiles';

function SettingsWatcher() {
  const [settings, setSettings] = useState({});
  const [projects, setProjects] = useState({});
  const [projectData, setProjectData] = useState({});
  const [preview, setPreview] = useState({});
  const [archive, setArchive] = useState({});

  useEffect(() => {
    const interval = setInterval(async () => {
      const newSettings = await store.getSettings();
      setSettings(newSettings);

      const newProjects = await store.getProjectsList();
      setProjects(newProjects);

      const newProjectData = {};
      try {
        newProjectData['project-one'] = await store.getProject('project-one');
      } catch (error) { /* ignore */ }
      try {
        newProjectData['project-two'] = await store.getProject('project-two');
      } catch (error) { /* ignore */ }
      try {
        newProjectData['project-three'] = await store
          .getProject('project-three');
      } catch (error) { /* ignore */ }
      try {
        newProjectData['project-four'] = await store
          .getProject('project-four');
      } catch (error) { /* ignore */ }
      try {
        newProjectData['new-project'] = await store.getProject('new-project');
      } catch (error) { /* ignore */ }

      setProjectData(newProjectData);

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
            projectData,
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
        icon={<PlusIcon />}
      >
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
          onClick={() => createProject('New Project')}
        />

        <TestButton
          name="Download Project"
          onClick={() => downloadProject('project-one')}
        />

        <TestButton
          name="Open in Finder"
          onClick={() => openInFinder('project-one')}
        />

        <TestButton
          name="Create Illustration"
          onClick={() => createIllustration('project-one', 'My Cool Illustration')}
        />

        <TestButton
          name="Create Illustration Two"
          onClick={() => createIllustration('project-one', 'My Second Illustration')}
        />

        <TestButton
          name="Delete Illustration Two"
          onClick={() => deleteIllustration('project-one', 'my-second-illustration')}
        />

        <TestButton
          name="Open Illustration"
          onClick={() => openIllustration('project-one', 'my-cool-illustration')}
        />

        <TestButton
          name="Generate Illustration"
          onClick={() => generateIllustration('project-one', 'my-cool-illustration')}
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
          name="Backup Project"
          onClick={() => backupFiles('project-one')}
        />

        <TestButton
          name="Duplicate Project"
          onClick={() => duplicateProject('project-one', 'project-two')}
        />

        <TestButton
          name="Rename Project"
          onClick={() => renameProject('project-two', 'Project Three')}
        />

        <TestButton
          name="Rename Illustration"
          onClick={() => renameIllustration(
            'project-three',
            'my-cool-illustration',
            'my-okay-illustration',
          )}
        />

        <TestButton
          name="Delete Project"
          onClick={() => deleteProject('project-one')}
        />
      </div>
      <br />
      <h2>These Should Throw Errors</h2>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <TestButton
          name="Create Existing Project"
          onClick={() => createProject('Project One')}
        />
        <TestButton
          name="Create Reserved Project"
          onClick={() => createProject('projects')}
        />
        <TestButton
          name="Rename Downloaded Project"
          onClick={() => renameProject('project-one', 'project-two')}
        />
        <TestButton
          name="Rename To Existing Project"
          onClick={() => renameProject('new-project', 'project-one')}
        />
        <TestButton
          name="Rename To Existing Illustration"
          onClick={() => renameIllustration(
            'project-one',
            'my-second-illustration',
            'My Cool Illustration',
          )}
        />
        <TestButton
          name="Rename Backed Up Illustration"
          onClick={() => renameIllustration(
            'project-one',
            'my-second-illustration',
            'My Third Illustration',
          )}
        />
      </div>
    </div>
  );
}
