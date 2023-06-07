import { useMemo } from 'react';
import { formatDistance, isToday, format } from 'date-fns';
import {
  STATUS_PROJECT_DRAFT,
} from '../../constants/statuses';
import atoms from '../../atoms';

const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('');

export default function Timestamp({ status, timestamp }) {
  const now = atoms.useRecoilValue(atoms.now);

  const time = useMemo(() => {
    if (!status || status === STATUS_PROJECT_DRAFT || !timestamp) {
      return null;
    }

    const ts = new Date(timestamp);

    if (now.getTime() < ts.getTime() + (60 * 1000)) {
      return '< 1 minute ago';
    }

    const isTodayResult = isToday(ts);
    if (!isTodayResult) {
      return format(ts, 'MMM d, y K:mmaaa');
    }

    return capitalize(formatDistance(ts, now, { addSuffix: true }));
  }, [status, timestamp, now]);

  return (
    <span>
      {time}
    </span>
  );
}
