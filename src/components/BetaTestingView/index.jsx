import { useState } from 'react';
import atoms from '../../atoms';
// import download from '../../actions/download';
import usePreviewProject from '../../actions/usePreviewProject';
import useDownloadProject from '../../actions/useDownloadProject';
import useArchiveProject from '../../actions/useArchiveProject';
import useGenerateIllustration from '../../actions/useGenerateIllustration';
import useCreate from '../../actions/useCreate';
import useDeleteIllustration from '../../actions/useDeleteIllustration';
import useDuplicateProject from '../../actions/useDuplicateProject';
import usePublishProject from '../../actions/usePublishProject';

import store from '../../store';
import testing from '../../actions/test';
import useIllustrationFallback from '../../actions/useIllustrationFallback';
import useRefreshStatus from '../../actions/useRefreshStatus';
import useBackupProject from '../../actions/useBackupProject';
import useOpenProject from '../../actions/useOpenProject';
import useOpenIllustration from '../../actions/useOpenIllustration';
import useDeleteProject from '../../actions/useDeleteProject';
import useDuplicateIllustration from '../../actions/useDuplicateIllustration';

const Button = ({ onClick, children }) => (
  <button
    style={{
      backgroundColor: 'black',
      color: 'white',
      cursor: 'pointer',
      padding: '5px',
    }}
    type="button"
    onClick={() => onClick()}
  >
    {children}
  </button>
);

const NewProject = () => {
  const [newProjectName, setNewProjectName] = useState('');
  const [newIlloName, setNewIlloName] = useState('');

  const newIllustration = useCreate();

  const onClick = async () => {
    await newIllustration(newIlloName, { newProject: newProjectName });
  };

  return (
    <div
      style={{
        marginBottom: 18,
        padding: 12,
      }}
    >
      <h3>Create New Project</h3>
      <input
        value={newProjectName}
        placeholder="Project Name"
        onChange={(e) => { setNewProjectName(e.target.value); }}
      />
      <br />
      <br />
      <input
        value={newIlloName}
        placeholder="Illustration Name"
        onChange={(e) => { setNewIlloName(e.target.value); }}
      />
      <br />
      <br />
      <Button onClick={onClick}>Create!</Button>
    </div>
  );
};

const Illustration = ({ id }) => {
  const data = atoms.use.illustration(id);

  const generate = useGenerateIllustration(id);
  const fallback = useIllustrationFallback(id);
  const openInIllo = useOpenIllustration(id);
  const deleteIllo = useDeleteIllustration(id);
  const status = atoms.use.status(id);
  const dupe = useDuplicateIllustration(id);
  const refreshStatus = useRefreshStatus(id);

  const illoActions = [
    ['Generate', generate],
    ['Status', () => refreshStatus()],
    ['Open', openInIllo],
    ['Delete', deleteIllo],
    ['Duplicate', () => dupe('My Illo')],
  ];

  return (
    <div style={
      {
        backgroundColor: '#dbccfd',
        padding: '10px',
      }
}
    >
      <h2>{id}</h2>
      <span
        style={{
          color: '#666',
          fontSize: '8px',
        }}
      >
        Version:
        {' '}
        {data.version}
      </span>
      <br />
      <span
        style={{
          color: '#666',
          fontSize: '8px',
        }}
      >
        Status:
        {' '}
        {status}
      </span>
      <img src={fallback} alt="test" />

      <div>
        {illoActions.map(([key, func]) => (
          <Button
            key={key}
            onClick={func}
          >
            {key}
          </Button>
        ))}
      </div>
      <br />
      <hr />
      <br />
    </div>
  );
};

const Project = ({ id }) => {
  const illustrations = atoms.use.illustrationsInProject(id);

  const [launchPreview, shutdownPreview] = usePreviewProject(id);

  const download = useDownloadProject(id);
  const archive = useArchiveProject(id);
  const publish = usePublishProject(id);
  const createIllo = useCreate(id);
  const backup = useBackupProject(id);
  const status = atoms.use.status(id);
  const refreshStatus = useRefreshStatus(id);
  const openInFinder = useOpenProject(id);
  const deleteProject = useDeleteProject(id);
  const dupe = useDuplicateProject(id);

  const projectActions = [
    ['Download', download],
    ['Archive', archive],
    ['Launch', launchPreview],
    ['Shutdown', shutdownPreview],
    ['Publish', publish],
    ['Backup', () => backup({ force: true })],
    ['New Illo', () => createIllo('Graph')],
    ['Status', () => refreshStatus()],
    ['Open', openInFinder],
    ['Delete', deleteProject],
    ['Duplicate', () => dupe('Project Three')],
  ];

  return (
    <div style={
      {
        backgroundColor: '#eee',
        padding: '10px',
        maxWidth: '400px',
      }
}
    >
      <h2>{id}</h2>
      <span
        style={{
          color: '#666',
          fontSize: '8px',
        }}
      >
        Status:
        {' '}
        {status}
      </span>
      <div>
        {projectActions.map(([key, func]) => (
          <Button
            key={key}
            onClick={func}
          >
            {key}
          </Button>
        ))}
      </div>
      <br />
      <hr />
      <br />
      <div>
        {illustrations.map((illoId) => (
          <Illustration
            key={illoId}
            id={illoId}
          />
        ))}
      </div>
    </div>
  );
};

export default function BetaTestingView() {
  const projects = atoms.use.projectsList();

  const createProject = useCreate();

  return (
    <div style={{ display: 'flex}' }}>
      <NewProject />

      {projects.map((id) => (
        <Project key={id} id={id} />
      ))}

      <br />
      <br />
      <Button
        onClick={() => createProject('Project Six', 'My Illo')}
      >
        Create Project
      </Button>
      <Button
        onClick={
          () => store.entities.get().then(
            (entries) => console.log(Object.fromEntries(entries)),
          )
        }
      >
        Print Entities
      </Button>
      <Button
        onClick={() => testing()}
      >
        Test
      </Button>
    </div>
  );
}
