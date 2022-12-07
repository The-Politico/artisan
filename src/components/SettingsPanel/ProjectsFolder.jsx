export default function ProjectsFolder({
  isInitial,
  projectsDir,
  setProjestDir,
}) {
  if (!isInitial) {
    return (
      <div>
        <p>Projects Folder</p>
        <p>{projectsDir}</p>
      </div>
    );
  }

  return <div />;
}
