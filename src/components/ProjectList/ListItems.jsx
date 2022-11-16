import ProjectListItem from '../ProjectListItem';

export default function ListItems({
  projectsList,
  isArchive,
  selectedIndex,
  setSelectedProject,
  archiveList,
}) {
  if (selectedIndex === 0) {
    return projectsList.map((slug, idx) => (
      <ProjectListItem
        key={slug}
        projectSlug={slug}
        index={idx}
        last={idx === projectsList.at(-1)}
        isArchive={isArchive}
        setSelectedProject={setSelectedProject}
      />
    ));
  }
  return archiveList.map((archiveItem, idx) => (
    <ProjectListItem
      key={archiveItem.slug}
      archiveProject={archiveItem}
      index={idx}
      last={idx === projectsList.at(-1)}
      isArchive={isArchive}
      setSelectedProject={setSelectedProject}
    />
  ));
}
