import cls from 'classnames';
import Skeleton from '../Skeleton';
import {
  flex,
  layout,
  margin,
  gap,
  borders,
} from '../../theme';

export default function ProjectToolbarSkeleton() {
  return (
    <div
      className={cls(
        flex.flex,
        flex.flexRow,
        layout.itemsCenter,
        margin.my2,
      )}
    >
      <Skeleton
        variant="circle"
        width="32px"
        height="32px"
      />
      <div
        className={cls(flex.flex, flex.flexCol, gap.y3, margin.ml2)}
        style={{ width: '50%' }}
      >
        <Skeleton
          className={borders.roundedMd}
          width="100%"
          height="24px"
        />
        <Skeleton
          className={borders.roundedMd}
          width="100%"
          height="16px"
        />
      </div>
      <div
        className={cls(flex.flex, gap.x2)}
        style={{ marginLeft: 'auto' }}
      >
        <Skeleton
          variant="circle"
          width="36px"
          height="36px"
        />
        <Skeleton
          variant="circle"
          width="36px"
          height="36px"
        />
        <Skeleton
          variant="circle"
          width="36px"
          height="36px"
        />
        <Skeleton
          variant="circle"
          width="36px"
          height="36px"
        />
      </div>
    </div>
  );
}
