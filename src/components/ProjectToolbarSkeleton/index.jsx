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
        width="26px"
        height="26px"
      />
      <div
        className={cls(flex.flex, flex.flexCol, gap.y3, margin.ml2)}
        style={{ width: '60%' }}
      >
        <Skeleton
          className={borders.roundedMd}
          width="100%"
          height="28px"
        />
        <Skeleton
          className={borders.roundedMd}
          width="100%"
          height="12px"
        />
      </div>
    </div>
  );
}
