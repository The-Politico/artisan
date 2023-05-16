import { useState, useMemo } from 'react';
import cls from 'classnames';
import TabToggle from '../TabToggle';
import {
  colors, flex, layout, margin, typography as type,
} from '../../theme';
import ProjectListItem from '../ProjectListItem';
import atoms from '../../atoms';

export default function ProjectList() {
  const tabItems = ['DocumentIcon', 'ArchiveBoxIcon'];
  const [tab, setTab] = useState(tabItems[0]);

  const isArchive = useMemo(() => tab === 'ArchiveBoxIcon', [tab]);

  const projectsList = atoms.useRecoilValue(
    atoms.projectsList,
  );

  return (
    <div>
      <div
        className={cls(
          flex.flex,
          layout.itemsCenter,
          layout.justifyBetween,
          margin.ml1,
          margin.mb2,
        )}
      >
        <h4
          className={cls(type.textLg, type.fontSemibold, colors.textSlate800)}
        >
          {!isArchive ? 'My Projects' : 'Archive'}
        </h4>
        <TabToggle
          items={tabItems}
          setSelectedIndex={(idx) => setTab(tabItems[idx])}
          selectedIndex={tabItems.findIndex((i) => i === tab)}
        />
      </div>
      <ul>
        {projectsList.length > 0 && projectsList.map((id) => (
          <ProjectListItem
            archiveMode={isArchive}
            key={id}
            id={id}
          />
        ))}
      </ul>
    </div>
  );
}
