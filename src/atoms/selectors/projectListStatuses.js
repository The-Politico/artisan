import { selector } from 'recoil';
import projectsList from './projectsList';
import status from '../status/atom';

const projectsListStatuses = selector({
  key: 'projectsListStatuses',
  get: ({ get }) => {
    const projects = get(projectsList);

    const test = projects.map((projectId) => ({
      id: projectId,
      status: get(status(projectId)),
    }));

    console.log({ test });
    return test;
  },
});

export default projectsListStatuses;
