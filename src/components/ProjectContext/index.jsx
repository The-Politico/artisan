import { createContext } from 'react';

const ProjectContext = createContext({
  projectSlug: null,
  status: null,
});

export default ProjectContext;
