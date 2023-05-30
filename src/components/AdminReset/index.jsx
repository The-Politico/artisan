import cls from 'classnames';
import Button from '../Button';
import { margin } from '../../theme';
import store from '../../store';

export default function AdminReset() {
  const onClick = async () => {
    await store.illustrations.reset();
  };

  return (
    <Button
      className={cls(margin.mt4)}
      variant="solid"
      onClick={onClick}
    >
      Admin Reset (Danger)!
    </Button>
  );
}
