import { useRecoilValue, useSetRecoilState } from 'recoil';
import projectEntitySelector from '../../atoms/entities/selectors/projects';
import projects from '../../atoms/projects/atom';
import illustrationsAtom from '../../atoms/illustrations/atom';
import illustrationsInProject
  from '../../atoms/projects/selectors/illustrationsInProject';
import Button from '../Button';

import { ENTITIES } from '../../store/init';

const Illustration = ({ id }) => {
  const data = useRecoilValue(illustrationsAtom(id));
  const { name } = data;

  return (
    <ul>
      <li>
        {' '}
        -
        {' '}
        {name}
      </li>
    </ul>
  );
};

const Project = ({ id }) => {
  const data = useRecoilValue(projects(id));
  const { name, lastUpdated } = data;

  const illustrations = useRecoilValue(illustrationsInProject(id));

  return (
    <div style={{ background: '#ccc', padding: '10px', margin: '10px' }}>
      <h3>{name}</h3>

      {illustrations.map((illoId) => (
        <Illustration key={illoId} id={illoId} />
      ))}

      <br />
      {!lastUpdated && (
        <em>Archived</em>
      )}
    </div>
  );
};

export default function StoreTestingView() {
  const projectsList = useRecoilValue(projectEntitySelector);

  const setIllo = useSetRecoilState(
    illustrationsAtom('I-dffa17b3-ff4c-46c8-916f-56d5d0e8ee83'),
  );

  const resetStore = async () => {
    await ENTITIES.reset();
    // await ENTITIES.set('P-65acbaed-e455-4ed6-b9f7-2fd1a68300eb', {
    //   slug: 'project-one',
    //   id: 'P-65acbaed-e455-4ed6-b9f7-2fd1a68300eb',
    //   name: 'Project One',
    //   version: '001671552831849',
    //   type: 'project',
    //   lastUpdated: new Date().toISOString(),
    // });
    // await ENTITIES.set('I-4b641789-f720-4f4f-bc8c-ad7363793550', {
    //   name: 'My Cool Illustration',
    //   slug: 'my-cool-illustration',
    //   id: 'I-4b641789-f720-4f4f-bc8c-ad7363793550',
    //   type: 'illustration',
    //   project: 'P-65acbaed-e455-4ed6-b9f7-2fd1a68300eb',
    // });
    await ENTITIES.set('P-65b25d70-759d-465c-abfe-b01881a20f62', {
      id: 'P-65b25d70-759d-465c-abfe-b01881a20f62',
      name: 'Project Four',
      slug: 'project-four',
      type: 'project',
      version: '001671552831849',
      lastUpdated: new Date().toISOString(),
    });
    await ENTITIES.set('I-dffa17b3-ff4c-46c8-916f-56d5d0e8ee83', {
      id: 'I-dffa17b3-ff4c-46c8-916f-56d5d0e8ee83',
      slug: 'illo-one',
      name: 'Illo One',
      type: 'illustration',
      project: 'P-65b25d70-759d-465c-abfe-b01881a20f62',
    });
  };

  const writeToStore = async () => {
    const cur = await ENTITIES.get('I-dffa17b3-ff4c-46c8-916f-56d5d0e8ee83');
    ENTITIES.set('I-dffa17b3-ff4c-46c8-916f-56d5d0e8ee83', {
      ...cur,
      name: 'Test Name',
    });
  };

  const writeToAtoms = async () => {
    setIllo((i) => ({
      ...i,
      name: 'Test Name',
    }));
  };

  return (
    <div>
      {projectsList.map((id) => (
        <Project key={id} id={id} />
      ))}

      <Button onClick={resetStore}>
        Reset Store
      </Button>
      <br />
      <Button onClick={writeToStore}>
        Write To Store
      </Button>
      <br />
      <Button onClick={writeToAtoms}>
        Write To Atoms
      </Button>

    </div>
  );
}
