import atoms from '../../atoms';
// import download from '../../actions/download';
import usePreview from '../../actions/usePreview';
import useDownload from '../../actions/useDownload';
import useCreateProject from '../../actions/useCreateProject';
import useArchiveProject from '../../actions/useArchive';
import useGenerateIllustration from '../../actions/useGenerateIllustration';
import usePublish from '../../actions/usePublish';
import useCreateIllustration from '../../actions/useCreateIllustration';

import store from '../../store';
import testing from '../../actions/test';

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

const Illustration = ({ id }) => {
  const data = atoms.use.illustration(id);
  const generate = useGenerateIllustration(id);

  const illoActions = [
    ['Generate', generate],
  ];

  return (
    <div style={
      {
        backgroundColor: '#dbccfd',
        padding: '10px',
      }
}
    >
      <h2>{data.name}</h2>
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
  const data = atoms.use.project(id);
  const illustrations = atoms.use.illustrationsInProject(id);

  const [launchPreview, shutdownPreview] = usePreview(id);
  const download = useDownload(id);
  const archive = useArchiveProject(id);
  const publish = usePublish(id);
  const createIllo = useCreateIllustration(id);

  const projectActions = [
    ['Download', download],
    ['Archive', archive],
    ['Launch', launchPreview],
    ['Shutdown', shutdownPreview],
    ['Publish', publish],
    ['New Illo', () => createIllo('First Illustration')],
  ];

  return (
    <div style={
      {
        backgroundColor: '#eee',
        padding: '10px',
        maxWidth: '200px',
      }
}
    >
      <h2>{data.name}</h2>
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
        {illustrations.map(({ id: illoId }) => (
          <Illustration key={illoId} illoId={id} />
        ))}
      </div>
    </div>
  );
};

export default function StoreTestingView() {
  const projects = atoms.use.projectsList();
  const preview = atoms.use.preview();

  const createProject = useCreateProject();

  // console.log({ Test: 'Settings', ...settings });
  console.log({ Test: 'Preview', ...preview });

  return (
    <div style={{ display: 'flex}' }}>
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
        onClick={() => store.entities.get().then(console.log)}
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
  // const projectsList = useRecoilValue(projectEntitySelector);

  // const setIllo = useSetRecoilState(
  //   illustrationsAtom('I-dffa17b3-ff4c-46c8-916f-56d5d0e8ee83'),
  // );

  // const resetStore = async () => {
  //   await ENTITIES.reset();
  //   // await ENTITIES.set('P-65acbaed-e455-4ed6-b9f7-2fd1a68300eb', {
  //   //   slug: 'project-one',
  //   //   id: 'P-65acbaed-e455-4ed6-b9f7-2fd1a68300eb',
  //   //   name: 'Project One',
  //   //   version: '001671552831849',
  //   //   type: 'project',
  //   //   lastUpdated: new Date().toISOString(),
  //   // });
  //   // await ENTITIES.set('I-4b641789-f720-4f4f-bc8c-ad7363793550', {
  //   //   name: 'My Cool Illustration',
  //   //   slug: 'my-cool-illustration',
  //   //   id: 'I-4b641789-f720-4f4f-bc8c-ad7363793550',
  //   //   type: 'illustration',
  //   //   project: 'P-65acbaed-e455-4ed6-b9f7-2fd1a68300eb',
  //   // });
  //   await ENTITIES.set('P-65b25d70-759d-465c-abfe-b01881a20f62', {
  //     id: 'P-65b25d70-759d-465c-abfe-b01881a20f62',
  //     name: 'Project Four',
  //     slug: 'project-four',
  //     type: 'project',
  //     version: '001671552831849',
  //     lastUpdated: new Date().toISOString(),
  //   });
  //   await ENTITIES.set('I-dffa17b3-ff4c-46c8-916f-56d5d0e8ee83', {
  //     id: 'I-dffa17b3-ff4c-46c8-916f-56d5d0e8ee83',
  //     slug: 'illo-one',
  //     name: 'Illo One',
  //     type: 'illustration',
  //     project: 'P-65b25d70-759d-465c-abfe-b01881a20f62',
  //   });
  // };

  // const writeToStore = async () => {
  //   const cur = await ENTITIES.get('I-dffa17b3-ff4c-46c8-916f-56d5d0e8ee83');
  //   ENTITIES.set('I-dffa17b3-ff4c-46c8-916f-56d5d0e8ee83', {
  //     ...cur,
  //     name: 'Test Name',
  //   });
  // };

  // const writeToAtoms = async () => {
  //   setIllo((i) => ({
  //     ...i,
  //     name: 'Test Name',
  //   }));
  // };

  // return (
  //   <div>
  //     {projectsList.map((id) => (
  //       <Project key={id} id={id} />
  //     ))}

  //     <Button onClick={resetStore}>
  //       Reset Store
  //     </Button>
  //     <br />
  //     <Button onClick={writeToStore}>
  //       Write To Store
  //     </Button>
  //     <br />
  //     <Button onClick={writeToAtoms}>
  //       Write To Atoms
  //     </Button>

  //   </div>
  // );
}
